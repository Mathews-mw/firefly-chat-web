'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useRef, useState } from 'react';

import { groupByDate } from '@/utils/group-by-date';

import { DateGroup } from './date-group';
import { MessageInput } from './message-input';
import { ScrollArea } from '../ui/scroll-area';
import { ChatMessage, useChat } from '@/context/chat-context';
import { ChatInitialLoadingSkeleton } from './chat-initial-loading-skeleton';

import { Loader2 } from 'lucide-react';

interface IProps {
	roomId: string;
	user: IUser;
	olderMessages: Array<ChatMessage>;
	initialLoading?: boolean;
	hasNextPage: boolean;
	isFetching: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
}

export function ChatComponent({
	roomId,
	user,
	olderMessages,
	initialLoading,
	hasNextPage,
	isFetching,
	isFetchingNextPage,
	fetchNextPage,
}: IProps) {
	const { ref: inViewRef, inView } = useInView();

	const {
		state: { messages },
		send,
	} = useChat();

	const containerRef = useRef<HTMLDivElement>(null);

	const chatGroupedByDate = useMemo(() => {
		// if (olderMessages.length > 0) {
		// 	olderMessages.reverse();
		// 	return groupByDate([...olderMessages, ...messages]);
		// }

		return groupByDate(messages);
	}, [messages]);

	function handleSendMessage(content: string) {
		if (!content.trim()) return;

		send({ event: 'sendMessage', payload: { roomId, content } });
	}

	useEffect(() => {
		const el = containerRef.current;

		if (el) {
			if (el) {
				if (inView && isFetchingNextPage) {
					el.scrollTop = el.scrollTop + 450;
					console.log('finaliza o scroll aqui');
					return;
				}
			}

			el.scrollTop = el.scrollHeight; // força o scroll até o fim
		}
	}, [messages, isFetchingNextPage, inView]);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<div className="bg-muted/50 flex h-[calc(100vh-10rem)] min-h-0 flex-col overflow-hidden rounded-xl">
			{initialLoading ? (
				<ChatInitialLoadingSkeleton />
			) : (
				<ScrollArea ref={containerRef} className="flex-1 overflow-y-auto px-4 py-2">
					{hasNextPage && (
						<div className="flex w-full items-center justify-center p-2">
							{isFetching || isFetchingNextPage ? (
								<div className="bg-muted w-min rounded-full p-1">
									<Loader2 className="text-primary animate-spin" />
								</div>
							) : (
								<button
									ref={inViewRef}
									className="text-muted-foreground hover:text-muted-foreground/50 cursor-pointer text-xs underline"
									onClick={() => fetchNextPage()}
									disabled={!hasNextPage || isFetchingNextPage}
								>
									Carregar mais antigas
								</button>
							)}
						</div>
					)}

					{chatGroupedByDate.map((group) => {
						return <DateGroup key={group.date.toString()} group={group} user={user} />;
					})}
				</ScrollArea>
			)}

			{!initialLoading && chatGroupedByDate.length === 0 && (
				<div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
					<Image
						src="/new-chat-message.png"
						alt="new-chat"
						height={280}
						width={320}
						className="h-[220] w-[280] object-fill"
					/>
					<div className="text-muted-foreground">
						<p className="text-center font-bold">Você está iniciando uma nova conversa</p>
						<p className="text-center text-sm">Digite a primeira mensagem abaixo.</p>
					</div>
				</div>
			)}

			<MessageInput onSendMessage={(msg) => handleSendMessage(msg)} disabled={initialLoading} />
		</div>
	);
}
