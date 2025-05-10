'use client';

import { useQuery } from '@tanstack/react-query';

import { listingAllUserPrivateRooms } from '@/_http/requests/chat/listing-all-user-private-rooms';

import { ChatItem } from './chat-item';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/user-context';
import { Separator } from '@/components/ui/separator';
import { ChatItemSkeleton } from './chat-item-skeleton';

import { MessageSquarePlus, Search } from 'lucide-react';

export function ChatList() {
	const { user } = useUser();

	const { data, isFetching } = useQuery({
		queryKey: ['rooms', 'private', user?.id],
		queryFn: async () => listingAllUserPrivateRooms({ limit: 10 }),
		enabled: !!user,
	});

	return (
		<div className="space-y-2">
			<div className="flex w-full items-center justify-between p-2">
				<h4 className="text-lg font-bold">Chat</h4>

				<div>
					<Button variant="ghost" size="sm" disabled={isFetching}>
						<MessageSquarePlus />
					</Button>
					<Button variant="ghost" size="sm" disabled={isFetching}>
						<Search />
					</Button>
				</div>
			</div>

			<Separator />
			<ul className="space-y-2">
				{data && data.rooms.length === 0 && (
					<li className="p-2">
						<span className="text-muted-foreground text-sm">Suas conversas irão aparecer aqui</span>
					</li>
				)}

				{data ? (
					<>
						{data.rooms.map((room) => {
							return <ChatItem key={room.id} room={room} />;
						})}
					</>
				) : (
					<>
						{Array.from({ length: 5 }, (_, i) => {
							return <ChatItemSkeleton key={i} />;
						})}
					</>
				)}
			</ul>
		</div>
	);
}
