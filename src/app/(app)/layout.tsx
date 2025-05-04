import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { isAuthenticated } from '@/auth/auth';

import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

	const isAuth = await isAuthenticated();

	if (!isAuth) {
		redirect('/sign-in');
	}

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />

						<div className="bg-border mr-2 h-5 w-px" />

						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="/home">Home</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Chats</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>

				<main className="flex min-h-0 flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
