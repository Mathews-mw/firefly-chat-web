'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Check, Loader2, X } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@/context/user-context';
import { errorHandler } from '@/_http/error-handler/error-handler';
import { getProfileNameInitials } from '@/utils/get-profile-name-initials';
import { acceptInvitation } from '@/_http/requests/friendships/accept-invitation';
import { rejectInvitation } from '@/_http/requests/friendships/reject-invitation';
import { getUserInvitationsAmount } from '@/_http/requests/friendships/get-user-invitations-amount';
import { listingUserPendingInvitations } from '@/_http/requests/friendships/listing-user-pending-invitations';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UsersIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';
import { TabItem } from './tab-item';
import { LayoutGroup } from 'motion/react';
import { PendingInviteTab } from './pending-invites-tab';
import { SentInviteTab } from './sent-invites-tab';

export function InvitationsDropdown() {
	const [open, setOpen] = useState(false);
	const [currentTab, setCurrentTab] = useState('tab1');

	const { user } = useUser();

	const { data: amountResponse, isFetching: isFetchingAmount } = useQuery({
		queryKey: ['invitations', user?.id, 'amount', 'PENDING'],
		queryFn: async () =>
			getUserInvitationsAmount({
				status: 'PENDING',
			}),
		enabled: !!user,
	});

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild disabled={isFetchingAmount}>
				{isFetchingAmount || !amountResponse ? (
					<Skeleton className="h-9 w-14" />
				) : (
					<Button variant="ghost" className="relative">
						{amountResponse.amount > 0 && (
							<div className="absolute top-0 left-0 size-5 rounded-full bg-orange-500">
								<span className="text-xs font-light text-white">{amountResponse.amount}</span>
							</div>
						)}
						<UsersIcon className="size-6 text-orange-300" />
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-h-[420px] min-w-56" align="end">
				<LayoutGroup>
					<Tabs.Root
						className="flex w-[300px] flex-col"
						defaultValue="tab1"
						value={currentTab}
						onValueChange={setCurrentTab}
					>
						<Tabs.List className="border-border flex shrink-0 border-b" aria-label="Manage your account">
							<TabItem value="tab1" title="Pendentes" isSelected={currentTab === 'tab1'} />
							<TabItem value="tab2" title="Enviados" isSelected={currentTab === 'tab2'} />
						</Tabs.List>

						<Tabs.Content value="tab1" className="p-3">
							{user && <PendingInviteTab user={user} enabled={open && currentTab === 'tab1'} />}
						</Tabs.Content>
						<Tabs.Content value="tab2" className="p-3">
							{user && <SentInviteTab user={user} enabled={open && currentTab === 'tab2'} />}
						</Tabs.Content>
					</Tabs.Root>
				</LayoutGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
