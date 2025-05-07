'use client';

import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

import { IAuthor } from '@/dummy-data/chat-data';
import { useEffect, useState } from 'react';

interface IMessageBubbleProps {
	author: IAuthor;
	message: string;
	isOwn: boolean;
	date: string | Date;
}

export function MessageBubble({ isOwn, message, date, author }: IMessageBubbleProps) {
	const [mounted, setMounted] = useState(false);

	const authorName = isOwn ? 'Você' : author.name;

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

			<p className="font-light text-pretty">{message}</p>

			<div className="flex w-full justify-end">
				<time className="text-muted-foreground text-xs">{dayjs(date).format('HH:mm')}</time>
			</div>
		</li>
	);
}
