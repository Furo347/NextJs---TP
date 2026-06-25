const GRAPHQL_ENDPOINT = "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

export type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  price: number;
  currencyCode: string;
};

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  
  const start = performance.now();

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "force-cache",
    next: {
      revalidate: 60,
      tags: ["sponsored-products"],
    },
  });

  console.log(
    `[mockShop] fetch products ${(performance.now() - start).toFixed(0)}ms`
  );

  const text = await response.text();

  let json: GraphQLResponse<T>;

  try {
    json = JSON.parse(text) as GraphQLResponse<T>;
  } catch {
    console.error("Réponse non JSON :", text.slice(0, 500));
    throw new Error("L’endpoint GraphQL ne renvoie pas du JSON");
  }

  if (!response.ok) {
    throw new Error(`Erreur HTTP GraphQL : ${response.status}`);
  }

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("Réponse GraphQL vide");
  }

  return json.data;
}

function mapProduct(product: ProductNode): SponsoredProduct {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    image: product.featuredImage?.url ?? "/placeholder.png",
    price: Number(product.priceRange.minVariantPrice.amount),
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
  };
}

export async function getSponsoredProducts(): Promise<SponsoredProduct[]> {
  const data = await graphqlRequest<{
    products: {
      nodes: ProductNode[];
    };
  }>(`
    query GetProducts {
      products(first: 6) {
        nodes {
          id
          title
          handle
          description
          featuredImage { url }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
        }
      }
    }
  `);

  return data.products.nodes.map(mapProduct);
}

export async function getSponsoredProductByHandle(
  handle: string
): Promise<SponsoredProduct | null> {
  const data = await graphqlRequest<{
    productByHandle: ProductNode | null;
  }>(
    `
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          featuredImage { url }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
        }
      }
    `,
    { handle }
  );

  if (!data.productByHandle) {
    return null;
  }

  return mapProduct(data.productByHandle);
}