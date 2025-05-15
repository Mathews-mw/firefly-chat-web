'use client';

import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';

import { ChatMessage, useChat } from '@/context/chat-context';

import { Button } from '../../ui/button';
import { EditMessageInput } from '../edit-message-input';
import { MessageBubbleTextContent } from './message-bubble-text-content';
import { MessageBubbleAttachmentContent } from './message-bubble-attachment-content';
import { ContextMenu, ContextMenuContent, ContextMenuItem } from '@/components/ui/context-menu';

import { Reply, SquarePen, Trash2 } from 'lucide-react';

interface IMessageBubbleProps {
	isOwn: boolean;
	message: ChatMessage;
}

export function MessageBubble({ isOwn, message }: IMessageBubbleProps) {
	const [mounted, setMounted] = useState(false);
	const [editMessage, setEditMessage] = useState(false);

	const { send } = useChat();

	const authorName = isOwn ? 'Você' : message.author.name;

	function handleEditMessage(content: string) {
		if (!content.trim()) return;

		send({ event: 'editMessage', payload: { messageId: message.id, roomId: message.roomId, content } });
		setEditMessage(false);
	}

	function handleDeleteMessage() {
		send({ event: 'deleteMessage', payload: { messageId: message.id, roomId: message.roomId } });
		setEditMessage(false);
	}

	useEffect(() => {
		// dispara a animação logo depois do primeiro paint
		setMounted(true);
	}, []);

	return (
		<>
			{editMessage ? (
				<div className="max-w-[520px]">
					<EditMessageInput
						initialContent={message.content}
						onClose={() => setEditMessage(false)}
						onSendMessage={(msg) => handleEditMessage(msg)}
					/>
				</div>
			) : (
				<>
					{message.isDeleted ? (
						<li
							role="listitem"
							className={twMerge([
								'w-fit max-w-[520px] space-y-1 rounded-md px-3 py-2 text-sm',
								'transform transition duration-300 ease-out hover:cursor-pointer',
								mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
								isOwn ? 'bg-primary/20 ml-auto first:rounded-tr-none' : 'bg-muted/80 mr-auto first:rounded-tl-none',
							])}
						>
							<div className="flex items-center gap-1">
								<p className="text-xs">Está mensagem foi excluída.</p>
								<Button variant="link" size="xs" className="text-xs">
									Desfazer
								</Button>
							</div>
						</li>
					) : (
						<ContextMenu>
							{message.attachments?.length === 0 && (
								<MessageBubbleTextContent isOwn={isOwn} mounted={mounted} authorName={authorName} message={message} />
							)}

							{message.attachments && message.attachments.length > 0 && (
								<MessageBubbleAttachmentContent
									isOwn={isOwn}
									mounted={mounted}
									authorName={authorName}
									message={message}
									attachments={message.attachments}
								/>
							)}

							<ContextMenuContent>
								<ContextMenuItem>
									<Reply />
									Responder
								</ContextMenuItem>

								{isOwn && (
									<ContextMenuItem onClick={() => setEditMessage(true)}>
										<SquarePen />
										Editar
									</ContextMenuItem>
								)}

								{isOwn && (
									<ContextMenuItem onClick={() => handleDeleteMessage()}>
										<Trash2 />
										Apagar
									</ContextMenuItem>
								)}
							</ContextMenuContent>
						</ContextMenu>
					)}
				</>
			)}
		</>
	);
}
