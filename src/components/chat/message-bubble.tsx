import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

import { IAuthor } from '@/dummy-data/chat-data';

interface IMessageBubbleProps {
	author: IAuthor;
	message: string;
	isOwn: boolean;
	date: string | Date;
}

export function MessageBubble({ isOwn, message, date, author }: IMessageBubbleProps) {
	const authorName = isOwn ? 'Você' : author.name;

	return (
		<li
			className={twMerge([
				'w-full max-w-[420px] space-y-1 rounded-md p-2',
				isOwn ? 'bg-primary/20 first:rounded-tr-none' : 'bg-muted/80 first:rounded-tl-none',
			])}
		>
			<span className="text-xs font-bold">{authorName}</span>

			<p className="text-sm font-light">{message}</p>

			<div className="flex w-full justify-end">
				<time className="text-muted-foreground text-xs">{dayjs(date).format('HH:mm')}</time>
			</div>
		</li>
	);
}
