'use client';

import { ComponentPropsWithoutRef } from 'react';

import { NavItem } from './nav-item';
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';

import { Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { CircleHelp } from 'lucide-react';

const items = [
	{
		title: 'Configurações',
		url: '/settings',
		icon: Cog6ToothIcon,
	},
	{
		title: 'Ajuda',
		url: '/help',
		// icon: QuestionMarkCircleIcon,
		icon: CircleHelp,
	},
];

export function NavSecondary(props: ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<NavItem key={item.title} href={item.url} title={item.title} icon={item.icon} />
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
