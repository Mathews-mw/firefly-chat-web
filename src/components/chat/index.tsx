'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { chatData } from '@/dummy-data/chat-data';
import { groupByDate } from '@/utils/group-by-date';

import { DateGroup } from './date-group';
import { MessageInput } from './message-input';
import { ScrollArea } from '../ui/scroll-area';
import { useChat } from '@/context/chat-context';

interface IProps {
	roomId: string;
	user: IUser;
}

export function ChatComponent({ roomId, user }: IProps) {
	const {
		state: { messages, status },
		send,
	} = useChat();

	const [draft, setDraft] = useState('');

	const [chatMessages, setChatMessages] = useState<typeof chatData>(chatData);

	const containerRef = useRef<HTMLDivElement>(null);

	const chatGroupedByDate = useMemo(() => {
		return groupByDate(messages);
	}, [messages]);

	function handleSendMessage() {
		if (!draft.trim()) return;

		send('sendMessage', { roomId, content: draft });

		setDraft('');
	}

	useEffect(() => {
		const el = containerRef.current;
		if (el) {
			el.scrollTop = el.scrollHeight; // força o scroll até o fim
		}
	}, [chatMessages]);

	return (
		<div className="bg-muted/50 flex h-[calc(100vh-10rem)] min-h-0 flex-col overflow-hidden rounded-xl">
			<ScrollArea ref={containerRef} className="flex-1 overflow-y-auto px-4 py-2">
				{chatGroupedByDate.map((group) => {
					return <DateGroup key={group.date.toString()} group={group} user={user} />;
				})}
			</ScrollArea>

			<MessageInput value={draft} onChangeValue={setDraft} onSendMessage={handleSendMessage} />
		</div>
	);
}
