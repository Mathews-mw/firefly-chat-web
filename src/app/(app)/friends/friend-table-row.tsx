'use client';

import { getProfileNameInitials } from '@/utils/get-profile-name-initials';

import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/status-badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { ChatBubbleOvalLeftEllipsisIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom } from '@/_http/requests/chat/create-room';
import { useUser } from '@/context/user-context';
import { Loader2 } from 'lucide-react';

interface IProps {
	friend: IFriendshipWithFriend;
	status: 'online' | 'offline';
}

export function FriendTableRow({ friend, status }: IProps) {
	const { user } = useUser();

	const navigate = useRouter();
	const queryClient = useQueryClient();

	const initials = getProfileNameInitials(friend.friend.name);

	const { mutateAsync: createRoomFn, isPending } = useMutation({
		mutationFn: createRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['rooms', 'private', user?.id] });
		},
	});

	async function handleStartChat() {
		const { room_id } = await createRoomFn({ guestId: friend.friend_id });

		navigate.push(`/chat/${room_id}`);
	}

	return (
		<TableRow>
			<TableCell className="font-medium">
				<div className="flex gap-2">
					<div className="relative size-10">
						<Avatar className="size-10 rounded-lg">
							{friend.friend.avatar_url && <AvatarImage src={friend.friend.avatar_url} alt={friend.friend.username} />}
							<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
						</Avatar>
						<StatusBadge status={status} className="absolute -right-1 bottom-0" />
					</div>

					<div className="flex flex-col">
						<span className="text-sm font-semibold">{friend.friend.name}</span>
						<span className="text-muted-foreground text-xs">@{friend.friend.username}</span>
					</div>
				</div>
			</TableCell>

			<TableCell className="text-right">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="sm" variant="ghost" onClick={() => handleStartChat()}>
								{isPending ? (
									<Loader2 className="text-muted-foreground size-5 animate-spin" />
								) : (
									<ChatBubbleOvalLeftEllipsisIcon className="size-6" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Conversar com {friend.friend.name}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</TableCell>
			<TableCell className="w-[46px] text-right">
				<Button size="sm" variant="ghost">
					<EllipsisVerticalIcon className="size-6" />
				</Button>
			</TableCell>
		</TableRow>
	);
}
