import { twMerge } from 'tailwind-merge';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ComponentProps, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

import { FileUp, ImageUp, Loader2, Upload, X } from 'lucide-react';
import { FaceSmileIcon, PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { useChat } from '@/context/chat-context';
import { useFileUpload } from '@/hooks/use-file-upload';
import { toast } from 'sonner';

interface IUploadResponse {
	message: string;
	attachments: Array<{
		id: string;
		title: string;
		url: string;
		room_id?: string;
		message_id?: string;
	}>;
}

interface IProps extends ComponentProps<'div'> {
	disabled?: boolean;
	onSendMessage: (text: string) => void;
}

export function MessageInput({ disabled = false, onSendMessage, className, ...props }: IProps) {
	const { send, roomId } = useChat();

	const [draft, setDraft] = useState('');

	const [parent] = useAutoAnimate();

	const inputRef = useRef<HTMLInputElement | null>(null);

	const { uploads, uploadFiles, onSelectFiles, onRemoveFile, isPending, reset } = useFileUpload<IUploadResponse>(
		'http://localhost:3737/api/attachments/chat'
	);

	function onChooseFile() {
		if (inputRef) {
			inputRef.current?.click();
		}
	}

	const handleSendMessage = useCallback(() => {
		if (draft.trim()) {
			onSendMessage(draft);
			setDraft('');
		}
	}, [draft, onSendMessage]);

	async function handleUploadFiles() {
		try {
			const response = await uploadFiles();

			const attachmentIds = response.flatMap((r) => r.attachments.map((a) => a.id));
			send({ event: 'sendAttachmentMessage', payload: { roomId: roomId!, attachmentIds } });

			reset();
		} catch (error) {
			console.warn('Algum upload falhou: ', error);
			toast.error('Falha ao enviar arquivo');
		}
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSendMessage();
		}
	};

	// useEffect(() => {
	// 	if (uploads.length > 0 && !isPending && uploads.every((u) => u.status === 'done')) {
	// 		const attachmentIds: Array<string> = [];

	// 		uploads.forEach((u) => {
	// 			if (u.response) {
	// 				attachmentIds.push(u.response.attachments[0].id);
	// 			}
	// 		});

	// 		send({
	// 			event: 'sendAttachmentMessage',
	// 			payload: { roomId: roomId!, attachmentIds },
	// 		});
	// 	}
	// }, [uploads, isPending, reset, send, roomId]);

	return (
		<div
			className={twMerge([
				'mx-auto mb-4 flex w-full max-w-[85%] flex-wrap justify-between gap-4 rounded-lg border px-4 py-2 transition-[color,box-shadow]',
				'focus-within:ring-primary focus-within:shadow-md focus-within:ring-1',
				className,
			])}
			{...props}
		>
			{uploads.length ? (
				<ul ref={parent} className="flex flex-wrap gap-2">
					{uploads.map((item, i) => {
						return (
							<li key={`${item.file.name}-${i}`} className="bg-background overflow-hidden rounded-md shadow-md">
								<div className="text-muted-foreground flex items-center gap-1 py-2 pr-1 pl-2">
									{item.file.type.includes('image') ? <ImageUp className="size-5" /> : <FileUp className="size-5" />}
									<span className="text-xs font-bold">{item.file.name}</span>

									<Button variant="ghost" size="xs" disabled={isPending} onClick={() => onRemoveFile(item.file.name)}>
										<X />
									</Button>
								</div>

								<Progress value={item.progress} className="h-1" />
							</li>
						);
					})}
				</ul>
			) : (
				<textarea
					placeholder="Digite uma mensagem..."
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
					onKeyDown={handleKeyDown}
					className={twMerge([
						'field-sizing-content max-h-48 min-h-9 resize-none px-3 py-1 text-start font-light outline-0',
						'placeholder:text-muted-foreground',
					])}
				/>
			)}

			<div className="flex gap-2">
				<div className="flex">
					<Button variant="ghost" size="sm">
						<FaceSmileIcon className="size-5" />
					</Button>

					<div>
						<input
							ref={inputRef}
							disabled={disabled}
							type="file"
							className="hidden"
							multiple
							onChange={(e) => onSelectFiles(e.target.files)}
						/>

						<Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={onChooseFile}>
							<PaperClipIcon className="size-5" />
						</Button>
					</div>
				</div>

				<Separator orientation="vertical" className="h-5" />

				{uploads.length ? (
					<Button variant="ghost" size="sm" onClick={handleUploadFiles} disabled={disabled || isPending}>
						{isPending ? <Loader2 className="size-5 animate-spin" /> : <Upload className="size-5" />}
					</Button>
				) : (
					<Button variant="ghost" size="sm" onClick={handleSendMessage} disabled={disabled || draft === ''}>
						<PaperAirplaneIcon className="size-5" />
					</Button>
				)}
			</div>
		</div>
	);
}
