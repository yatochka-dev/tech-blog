"use client";
import React, { type ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className: string;
  href: string;
}

const TransitionLink = ({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  return (
    <Link
      {...props}
      className={cn("", className)}
      onClick={async (event) => {
        event.preventDefault();
        router.push(href);
      }}
      href={href}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
