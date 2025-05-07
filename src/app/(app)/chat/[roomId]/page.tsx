'use client';

import { ChatComponent } from '@/components/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChat } from '@/context/chat-context';
import { useUser } from '@/context/user-context';
import { groupByDate } from '@/utils/group-by-date';
import { use, useMemo, useState } from 'react';

interface IProps {
	params: Promise<{
		roomId: string;
	}>;
}

export default function ChatRoomPage({ params }: IProps) {
	const { roomId } = use(params);
	const { user } = useUser();

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex gap-4">
				<Avatar className="size-12 rounded-lg">
					<AvatarImage src="https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu" alt="@shadcn" />
					<AvatarFallback className="rounded-lg">CN</AvatarFallback>
				</Avatar>

				<div>
					<h4 className="text-lg font-bold">Ruth Jacobs</h4>
					<div className="flex items-center gap-1.5">
						<div className="size-2 rounded-full bg-emerald-500" />
						<span className="text-muted-foreground text-xs">Online</span>
					</div>
				</div>

				<span>Você se conectou na sala: {roomId}</span>
			</div>

			{user && <ChatComponent roomId={roomId} user={user} />}
		</div>
	);
}
