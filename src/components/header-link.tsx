import { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

interface HeaderLinkProps extends PropsWithChildren {
  to: string;
  title?: string;
  className?: string;
  icon: IconType
}

export function HeaderLink({
  to,
  title,
  className,
  children,
  icon: Icon,
}: HeaderLinkProps) {
  return (
    <li className="h-full hover:bg-[#f4f4f6] dark:hover:bg-[#27262b] transition-colors rounded-md">
      <Link
        to={to}
        className={cn(
          "p-2 flex items-center h-full gap-x-1 border-b rounded-md border-transparent",
          className
        )}
      >
        <Icon />
        {children}
        {title && title}
      </Link>
    </li>
  );
}
