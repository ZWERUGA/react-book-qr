import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { createLink, LinkComponent } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const linkVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

interface BasicLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof linkVariants> {
	asChild?: boolean;
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "a";
		return (
			<Comp
				className={cn(linkVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
	return <CreatedLinkComponent preload={"intent"} {...props} />;
};
