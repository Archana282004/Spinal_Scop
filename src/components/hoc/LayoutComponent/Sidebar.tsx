'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
	label: string;
	href: string;
	icon?: React.ReactNode;
};

const navItems: NavItem[] = [
	{ label: "Projects", href: "/projects" },
	{ label: "Users", href: "/users" },
	{ label: "Search", href: "/search" },
	{ label: "Settings", href: "/settings" },
];

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className="flex h-full min-h-screen flex-col bg-background text-foreground">
			<div className="flex items-center gap-3 px-4 py-4 border-b border-foreground/10">
				<div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background font-bold">LS</div>
				<div className="flex flex-col">
					<span className="font-heading text-base leading-none">LightSource</span>
					<span className="text-xs text-foreground/60">Research</span>
				</div>
			</div>

			<nav className="flex-1 px-2 py-4">
				<ul className="space-y-1">
					{navItems.map(({ label, href }) => {
						const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
						return (
							<li key={href}>
								<Link
									href={href}
									className={`block rounded-md px-3 py-2 text-sm font-medium hover:bg-foreground/10 transition-colors ${
										isActive ? "bg-foreground/10 text-foreground" : "text-foreground"
									}`}
								>
									{label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="mt-auto border-t border-foreground/10 p-4">
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-semibold">RJ</div>
					<div className="flex-1 min-w-0">
						<p className="truncate text-sm font-medium">Ranjith</p>
						<p className="truncate text-xs text-foreground/60">Administrator</p>
					</div>
				</div>
				<button className="mt-3 w-full rounded-md bg-secondary px-3 py-2 text-sm text-background hover:bg-secondary/90">Logout</button>
			</div>
		</div>
	);
};

export default Sidebar;


