import { ComponentProps, KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import { FaceSmileIcon, PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

interface IProps extends ComponentProps<'div'> {
	value?: string;
	onChangeValue: (value: string) => void;
	onSendMessage: () => void;
}

export function MessageInput({ value, onChangeValue, onSendMessage, className, ...props }: IProps) {
	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			onSendMessage();
		}
	};

	return (
		<div
			className={twMerge([
				'mx-auto mb-4 flex w-full max-w-[85%] flex-wrap justify-between gap-4 rounded-lg border px-4 py-2 transition-[color,box-shadow]',
				'focus-within:ring-primary focus-within:shadow-md focus-within:ring-1',
				className,
			])}
			{...props}
		>
			<textarea
				placeholder="Digite uma mensagem..."
				value={value}
				onChange={(e) => onChangeValue(e.target.value)}
				onKeyDown={handleKeyDown}
				className={twMerge([
					'field-sizing-content max-h-48 min-h-9 resize-none px-3 py-1 text-start font-light outline-0',
					'placeholder:text-muted-foreground',
				])}
			/>

			<div className="flex gap-2">
				<div className="flex">
					<Button variant="ghost" size="sm">
						<PaperClipIcon className="size-5" />
					</Button>
					<Button variant="ghost" size="sm">
						<FaceSmileIcon className="size-5" />
					</Button>
				</div>

				<Separator orientation="vertical" className="h-5" />

				<Button variant="ghost" size="sm" onClick={onSendMessage}>
					<PaperAirplaneIcon className="size-5" />
				</Button>
			</div>
		</div>
	);
}
