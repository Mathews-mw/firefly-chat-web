'use client';

import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';

import { ChatMessage } from '@/context/chat-context';

import { Check, CheckCheck } from 'lucide-react';

interface IMessageBubbleProps {
	isOwn: boolean;
	message: ChatMessage;
}

export function MessageBubble({ isOwn, message }: IMessageBubbleProps) {
	const [mounted, setMounted] = useState(false);

	const authorName = isOwn ? 'Você' : message.author.name;

	useEffect(() => {
		// dispara a animação logo depois do primeiro paint
		setMounted(true);
	}, []);

	return (
		<li
			role="listitem"
			className={twMerge([
				'w-fit max-w-[520px] space-y-1 rounded-md px-4 py-2 text-sm',
				'transform transition duration-300 ease-out',
				mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
				isOwn ? 'bg-primary/20 ml-auto first:rounded-tr-none' : 'bg-muted/80 mr-auto first:rounded-tl-none',
			])}
		>
			<span className="text-xs font-bold">{authorName}</span>

			<p className="font-light text-pretty">{message.content}</p>

			<div className="text-muted-foreground flex w-full items-center justify-end gap-0.5">
				<time className="text-xs">{dayjs(message.createdAt).format('HH:mm')}</time>
				{isOwn && <>{message.readAt ? <CheckCheck className="size-3.5" /> : <Check className="size-3" />}</>}
			</div>
		</li>
	);
}
