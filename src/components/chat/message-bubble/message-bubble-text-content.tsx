import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

import { ChatMessage } from '@/context/chat-context';

import { Check, CheckCheck } from 'lucide-react';
import { ContextMenuTrigger } from '@/components/ui/context-menu';

interface IProps {
	mounted: boolean;
	isOwn: boolean;
	message: ChatMessage;
	authorName: string;
}

export function MessageBubbleTextContent({ mounted, isOwn, message, authorName }: IProps) {
	return (
		<ContextMenuTrigger asChild>
			<li
				role="listitem"
				className={twMerge([
					'w-fit max-w-[520px] space-y-1 rounded-md px-3 py-2 text-sm',
					'transform transition duration-300 ease-out hover:cursor-pointer',
					mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
					isOwn ? 'bg-primary/20 ml-auto first:rounded-tr-none' : 'bg-muted/80 mr-auto first:rounded-tl-none',
				])}
			>
				<span className="text-xs font-bold hover:cursor-text">{authorName}</span>

				<p className="font-light text-pretty hover:cursor-text">{message.content}</p>

				<div className="text-muted-foreground flex w-full items-center justify-end gap-0.5">
					<time className="text-xs hover:cursor-text">{dayjs(message.createdAt).format('HH:mm')}</time>
					{isOwn && <>{message.readAt ? <CheckCheck className="size-3.5" /> : <Check className="size-3" />}</>}
				</div>
			</li>
		</ContextMenuTrigger>
	);
}
