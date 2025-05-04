'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ComponentProps, ComponentType, SVGProps } from 'react';

import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

interface IProps extends ComponentProps<typeof Link> {
	title: string;
	href: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function NavItem({ title, href, icon: Icon, ...props }: IProps) {
	const pathname = usePathname();

	const isCurrent = href.toString() === pathname;

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild isActive={isCurrent}>
				<Link href={href} {...props}>
					<Icon className="size-5" />
					<span>{title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
