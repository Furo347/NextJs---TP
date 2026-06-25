import { unstable_cache } from "next/cache";

export function computePrimes(limit: number): {
  count: number;
  sum: number;
  limit: number;
} {
  const isPrime = new Uint8Array(limit + 1).fill(1);

  isPrime[0] = isPrime[1] = 0;

  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  let count = 0;
  let sum = 0;

  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      count++;
      sum += i;
    }
  }

  return {
    count,
    sum,
    limit,
  };
}

export async function getPrimesWithoutCache(limit: number) {
  const start = performance.now();

  const result = computePrimes(limit);

  console.log(
    `[Primes] without cache ${(performance.now() - start).toFixed(0)}ms`
  );

  return result;
}

export const getPrimesWithCache = unstable_cache(
  async (limit: number) => {
    const start = performance.now();

    const result = computePrimes(limit);

    console.log(
      `[Primes] with cache ${(performance.now() - start).toFixed(0)}ms`
    );

    return result;
  },
  ["prime-calculation"],
  {
    revalidate: 60,
    tags: ["prime-calculation"],
  }
);