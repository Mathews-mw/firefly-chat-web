'use client';

import { useRouter } from 'next/navigation';
import { ChatMessage, useChat } from '@/context/chat-context';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import { InfiniteData, QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useUser } from '@/context/user-context';
import { getRoom } from '@/_http/requests/chat/get-room';
import {
	IListingUserMessagesByRoomResponse,
	listingUserMessagesByRoom,
} from '@/_http/requests/chat/listing-user-messages-by-room';

import { ChatDetails } from './chat-details/chat-details';
import { Button } from '@/components/ui/button';
import { ChatComponent } from '@/components/chat';
import { Skeleton } from '@/components/ui/skeleton';
import { getProfileNameInitials } from '@/utils/get-profile-name-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { LogOut, PanelLeftClose, Search, SquaresExclude } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface IProps {
	params: Promise<{
		roomId: string;
	}>;
}

export default function ChatRoomPage({ params }: IProps) {
	const [openChatDetails, setOpenChatDetails] = useState(false);

	const { roomId } = use(params);
	const { user } = useUser();
	const {
		selectRoomId,
		send,
		loadHistory,
		state: { messages },
	} = useChat();

	const navigate = useRouter();

	const loadedHistoryRef = useRef(false); // ref para garantir que o histórico só seja injetado uma vez.
	const hasMarkedRef = useRef<Set<string>>(new Set()); // impede reenvio do mesmo conjunto repetidamente.

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
		staleTime: 1000 * 30, // 30 seconds
	});

	const flatHistoryMessages = useMemo(() => {
		if (!chatMessageHistory) return [];

		return chatMessageHistory.pages[chatMessageHistory.pages.length - 1].chat_messages
			.map((item) => {
				const chatMessage: ChatMessage = {
					id: item.id,
					roomId: item.room_id,
					senderId: item.sender_id,
					content: item.content,
					createdAt: item.created_at,
					isDeleted: item.is_deleted,
					readAt: item.read_receipts.length ? item.read_receipts[0].read_at : undefined,
					author: { id: item.author.id, name: item.author.name, avatarUrl: item.author.avatar_url ?? undefined },
					attachments: item.attachments.map((attachment) => ({
						id: attachment.id,
						title: attachment.title,
						url: attachment.url,
						type: attachment.type,
					})),
				};

				return chatMessage;
			})
			.reverse();
	}, [chatMessageHistory]);

	function handleLeaveRoom() {
		selectRoomId(undefined);

		navigate.push('/chat');
	}

	useEffect(() => {
		if (flatHistoryMessages.length > 0) {
			loadHistory(flatHistoryMessages);
			loadedHistoryRef.current = true;
		}
	}, [flatHistoryMessages, loadHistory]);

	useEffect(() => {
		if (!messages.length || !user) return;

		// identifica as mensagens recebidas de outro usuário ainda não marcadas como lidas
		const unReadMessages = messages
			.filter((msg) => msg.senderId !== user?.id && !msg.readAt && !hasMarkedRef.current.has(msg.id))
			.map((m) => m.id);

		// Problema tá aqui
		if (unReadMessages.length > 0) {
			send({ event: 'markAsRead', payload: { roomId, messageIds: unReadMessages } });
			// marcar localmente para não reenviar o evento de markAsRead
			unReadMessages.forEach((msgId) => hasMarkedRef.current.add(msgId));
		}
	}, [messages, roomId, user, send]);

	return (
		<div className="flex gap-4">
			<div className="flex w-full flex-col gap-4 transition-[width] duration-250 ease-in-out">
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
										<Button variant="ghost" size="sm" onClick={() => setOpenChatDetails((state) => !state)}>
											<PanelLeftClose
												className={twMerge([
													'size-5',
													openChatDetails ? 'rotate-180' : 'rotate-0',
													'transition-[rotate] duration-250 ease-linear',
												])}
											/>
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
						olderMessages={messages}
						isFetching={isFetching}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
						initialLoading={isLoading}
					/>
				)}
			</div>

			<ChatDetails isOpen={openChatDetails} roomId={roomId} />
		</div>
	);
}
