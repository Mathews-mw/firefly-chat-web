'use client';

import { use, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessage, useChat } from '@/context/chat-context';
import { InfiniteData, QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useUser } from '@/context/user-context';
import { getRoom } from '@/_http/requests/chat/get-room';
import {
	IListingUserMessagesByRoomResponse,
	listingUserMessagesByRoom,
} from '@/_http/requests/chat/listing-user-messages-by-room';

import { Button } from '@/components/ui/button';
import { ChatComponent } from '@/components/chat';
import { Skeleton } from '@/components/ui/skeleton';
import { getProfileNameInitials } from '@/utils/get-profile-name-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { LogOut, Search, SquaresExclude } from 'lucide-react';

interface IProps {
	params: Promise<{
		roomId: string;
	}>;
}

export default function ChatRoomPage({ params }: IProps) {
	const { roomId } = use(params);

	const { user } = useUser();
	const { selectRoomId, send } = useChat();

	const navigate = useRouter();
	const hasMarkedRef = useRef<Set<string>>(new Set()); //impede reenvio do mesmo conjunto repetidamente.

	const { data: room } = useQuery({
		queryKey: ['room', 'PRIVATE', roomId],
		queryFn: async () => getRoom({ roomId, type: 'PRIVATE', userId: user?.id }),
		enabled: !!user,
	});

	const {
		data: chatMessageHistory,
		isLoading,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery<
		IListingUserMessagesByRoomResponse,
		Error,
		InfiniteData<IListingUserMessagesByRoomResponse>,
		QueryKey,
		string | undefined
	>({
		queryKey: ['messages', user?.id, roomId],
		queryFn: async ({ pageParam }) => {
			const response = await listingUserMessagesByRoom({ roomId, limit: 10, cursor: pageParam });
			return response;
		},
		initialPageParam: undefined,
		getPreviousPageParam: (firstPage) => firstPage.cursor.previous_cursor,
		getNextPageParam: (lastPage) => lastPage.cursor.next_cursor,
		enabled: !!user,
		refetchOnWindowFocus: false,
	});

	const chatMessagesGroped = useMemo(() => {
		if (chatMessageHistory) {
			const chatMessagesFlatArray = chatMessageHistory.pages
				.map((item) => item.chat_messages)
				.flat(Infinity) as IChatMessageWithAuthor[];

			// identifique as mensagens recebidas de outro usuário ainda não marcadas como lidas
			const unReadMessages = chatMessagesFlatArray
				.filter((cMsg) => cMsg.sender_id !== user?.id && cMsg.read_receipts.length === 0)
				.map((m) => m.id);

			if (unReadMessages.length > 0) {
				send('markAsRead', { roomId, messageIds: unReadMessages });

				// marcar localmente para não reenviar o evento de markAsRead
				unReadMessages.forEach((msgId) => hasMarkedRef.current.add(msgId));
			}

			return chatMessagesFlatArray.map((item) => {
				const chatMessage: ChatMessage = {
					id: item.id,
					roomId: item.room_id,
					senderId: item.sender_id,
					content: item.content,
					createdAt: item.created_at,
					readAt: item.read_receipts.length ? item.read_receipts[0].read_at : undefined,
					author: { id: item.author.id, name: item.author.name, avatarUrl: item.author.avatar_url ?? undefined },
				};

				return chatMessage;
			});
		}

		return [];
	}, [chatMessageHistory, roomId, user?.id, send]);

	function handleLeaveRoom() {
		selectRoomId(undefined);

		navigate.push('/chat');
	}

	return (
		<div className="flex w-full flex-col gap-4">
			{room ? (
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="relative size-12">
							<Avatar className="size-12 rounded-lg">
								{room.participants[0].user.avatar_url && (
									<AvatarImage
										src={room.participants[0].user.avatar_url}
										alt={`@${room.participants[0].user.username}`}
									/>
								)}
								<AvatarFallback className="rounded-lg">
									{getProfileNameInitials(room.participants[0].user.name)}
								</AvatarFallback>
							</Avatar>

							<div className="bg-background absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full">
								<div
									data-state={'online'}
									className="flex size-4 items-center justify-center rounded-full data-[state=offline]:bg-zinc-400 data-[state=online]:bg-emerald-500 dark:data-[state=offline]:bg-zinc-700"
								>
									<div className="bg-background size-2 rounded-full" />
								</div>
							</div>
						</div>

						<div>
							<h4 className="text-lg font-bold">{room.participants[0].user.name}</h4>
							<span className="text-muted-foreground text-sm">@{room.participants[0].user.username}</span>
						</div>
					</div>

					<div>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="sm" onClick={() => handleLeaveRoom()}>
										<LogOut className="size-5 rotate-180" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Sair do chat</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="sm">
										<Search className="size-5" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Localizar no chat</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="sm">
										<SquaresExclude className="size-5" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Detalhes do chat</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			) : (
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center gap-2">
						<Skeleton className="size-12 rounded-lg" />

						<div className="flex h-12 flex-col justify-evenly">
							<Skeleton className="h-4 w-36" />
							<Skeleton className="h-3 w-20" />
						</div>
					</div>

					<div className="flex gap-4">
						<Skeleton className="size-8" />
						<Skeleton className="size-8" />
						<Skeleton className="size-8" />
					</div>
				</div>
			)}

			{user && (
				<ChatComponent
					roomId={roomId}
					user={user}
					olderMessages={chatMessagesGroped}
					isFetching={isFetching}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
					initialLoading={isLoading}
				/>
			)}
		</div>
	);
}
