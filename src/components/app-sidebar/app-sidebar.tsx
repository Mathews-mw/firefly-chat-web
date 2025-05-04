import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import Image from 'next/image';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';

const user = {
	name: 'Mathews Araújo',
	email: 'mathews.mw@gmail.com',
	avatar: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
};

export function AppSidebar() {
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
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
