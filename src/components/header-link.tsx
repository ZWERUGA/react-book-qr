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
    <li className="h-full hover:bg-[#f4f4f6] dark:hover:bg-[#27262b] transition-colors rounded-md">
      <Link to={to} className={cn("p-2 flex items-center h-full", className)}>
        {children}
        {title && title}
      </Link>
    </li>
  );
}
