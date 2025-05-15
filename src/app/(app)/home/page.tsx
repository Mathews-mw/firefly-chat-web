'use client';

import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

export default function HomePage() {
	return (
		<div className="">
			<h1>Home Page</h1>

			<div className="mx-auto flex h-full w-full max-w-96 flex-1 flex-col items-center justify-center gap-4">
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<li>Menu</li>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>Profile</ContextMenuItem>
						<ContextMenuItem>Billing</ContextMenuItem>
						<ContextMenuItem>Team</ContextMenuItem>
						<ContextMenuItem>Subscription</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			</div>
		</div>
	);
}
