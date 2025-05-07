'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import Image from 'next/image';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { useUser } from '@/context/user-context';
import { Skeleton } from '../ui/skeleton';

export function AppSidebar() {
	const { user } = useUser();

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader>
				<div className="flex gap-2">
					<Image src="/firefly_logo.png" alt="logo" width={28} height={28} className="size-7 shrink-0" />
					<span className="group-data-[state=collapsed]:animate-out group-data-[state=expanded]:animate-in text-muted-foreground text-lg font-bold group-data-[state=collapsed]:hidden">
						Firefly Chat
					</span>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<NavMain />
				<NavSecondary className="mt-auto" />
			</SidebarContent>

			<SidebarFooter>
				{user ? (
					<NavUser user={user} />
				) : (
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8 rounded-lg" />

						<div className="space-y-1">
							<Skeleton className="h-3 w-32" />
							<Skeleton className="h-2 w-36" />
						</div>
					</div>
				)}
			</SidebarFooter>
		</Sidebar>
	);
}
