'use client';

import { useChat } from '@/context/chat-context';
import { ReactNode, use, useEffect } from 'react';

interface ILayoutProps {
	children: Readonly<ReactNode>;
	params: Promise<{
		roomId: string;
	}>;
}

export default function ChatRoomLayout({ children, params }: ILayoutProps) {
	const { roomId } = use(params);

	const { selectRoomId } = useChat();

	useEffect(() => {
		selectRoomId(roomId);
	}, [roomId, selectRoomId]);

	return <>{children}</>;
}
