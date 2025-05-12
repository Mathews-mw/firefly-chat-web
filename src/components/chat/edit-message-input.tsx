import { ComponentProps, KeyboardEvent, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import { FaceSmileIcon, PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { Save, X } from 'lucide-react';

interface IProps extends ComponentProps<'div'> {
	disabled?: boolean;
	initialContent: string;
	onClose: () => void;
	onSendMessage: (text: string) => void;
}

export function EditMessageInput({
	disabled = false,
	initialContent,
	onClose,
	onSendMessage,
	className,
	...props
}: IProps) {
	const [draft, setDraft] = useState(initialContent);

	const handleSendMessage = useCallback(() => {
		if (draft.trim()) {
			onSendMessage(draft);
			setDraft('');
		}
	}, [draft, onSendMessage]);

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		console.log('event key: ', event.key);
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSendMessage();
			onClose();
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
		}
	};

	return (
		<div
			className={twMerge([
				'flex w-full max-w-[85%] flex-wrap rounded-lg border p-1 transition-[color,box-shadow]',
				'focus-within:ring-primary focus-within:shadow-md focus-within:ring-1',
				className,
			])}
			{...props}
		>
			<textarea
				placeholder="Digite uma mensagem..."
				value={draft}
				onChange={(e) => setDraft(e.target.value)}
				onKeyDown={handleKeyDown}
				className={twMerge([
					'field-sizing-content max-h-48 min-h-9 w-full resize-none px-3 py-1 text-start font-light outline-0',
					'placeholder:text-muted-foreground text-sm',
				])}
			/>

			<div className="flex w-full justify-end gap-2">
				<div className="flex">
					<Button variant="ghost" size="xs">
						<FaceSmileIcon className="size-4" />
					</Button>
				</div>

				<Separator orientation="vertical" className="h-4" />

				<Button variant="ghost" size="xs" onClick={onClose} disabled={disabled}>
					<X className="size-4" />
				</Button>
				<Button variant="ghost" size="xs" onClick={handleSendMessage} disabled={disabled || draft === ''}>
					<Save className="size-4" />
				</Button>
			</div>
		</div>
	);
}
