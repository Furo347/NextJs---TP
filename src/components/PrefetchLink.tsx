"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type PrefetchLinkProps = {
  href: string;
  children: ReactNode;
  prefetchOnHover?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "prefetch">;

export default function PrefetchLink({
  href,
  children,
  prefetchOnHover = false,
  className,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      prefetch={prefetchOnHover ? false : undefined}
      className={className}
      onMouseEnter={() => {
        if (prefetchOnHover) {
          router.prefetch(href);
        }
      }}
      onFocus={() => {
        if (prefetchOnHover) {
          router.prefetch(href);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}