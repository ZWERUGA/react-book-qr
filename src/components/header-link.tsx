import { Link } from "@tanstack/react-router";

interface HeaderLinkProps {
  to: string;
  title: string;
}

export function HeaderLink({ to, title }: HeaderLinkProps) {
  return (
    <Link to={to} className="px-4 py-2 [&.active]:border-b border-foreground">
      {title}
    </Link>
  );
}