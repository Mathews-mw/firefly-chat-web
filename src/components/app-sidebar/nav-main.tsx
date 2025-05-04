'use client';

import { NavItem } from './nav-item';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from '../ui/sidebar';

import {
	ChatBubbleLeftEllipsisIcon,
	ChatBubbleLeftRightIcon,
	HomeIcon,
	InboxIcon,
	UserGroupIcon,
} from '@heroicons/react/24/outline';

// Menu items.
const items = [
	{
		title: 'Home',
		url: '/home',
		icon: HomeIcon,
	},
	{
		title: 'Amigos',
		url: '/friends',
		icon: UserGroupIcon,
	},
	{
		title: 'Chat',
		url: '/chat',
		icon: ChatBubbleLeftEllipsisIcon,
	},
	{
		title: 'Canais',
		url: '/channels',
		icon: ChatBubbleLeftRightIcon,
	},
	{
		title: 'Inbox',
		url: '/inbox',
		icon: InboxIcon,
	},
];

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Aplicação</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => {
						return <NavItem key={item.title} href={item.url} title={item.title} icon={item.icon} />;
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
