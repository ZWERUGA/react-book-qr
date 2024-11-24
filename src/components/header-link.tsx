import { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface HeaderLinkProps extends PropsWithChildren {
  to: string;
  title?: string;
  className?: string;
}

export function HeaderLink({
  to,
  title,
  className,
  children,
}: HeaderLinkProps) {
  return (
    <Link to={to} className={cn("p-2 flex items-center", className)}>
      {children}
      {title && title}
    </Link>
  );
}
