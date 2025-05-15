import dayjs from 'dayjs';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { Button } from '../../ui/button';
import { ChatMessage } from '@/context/chat-context';
import { ImageExpanderDialog } from '../../image-expander-dialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ArrowDownToLine, Check, CheckCheck, FileText, FolderArchive } from 'lucide-react';
import { ContextMenuTrigger } from '@/components/ui/context-menu';

interface IProps {
	mounted: boolean;
	isOwn: boolean;
	message: ChatMessage;
	authorName: string;
	attachments: Array<{
		id: string;
		title: string;
		url: string;
		type: AttachmentType;
	}>;
}

export function MessageBubbleAttachmentContent({ mounted, isOwn, message, authorName, attachments }: IProps) {
	return (
		<ContextMenuTrigger asChild>
			<li
				role="listitem"
				className={twMerge([
					'flex w-fit max-w-[520px] flex-col space-y-1 rounded-md px-3 py-2 text-sm',
					'transform transition duration-300 ease-out hover:cursor-pointer',
					mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
					isOwn ? 'bg-primary/20 ml-auto first:rounded-tr-none' : 'bg-muted/80 mr-auto first:rounded-tl-none',
				])}
			>
				<span className="w-full text-xs font-bold hover:cursor-text">{authorName}</span>

				<div className="flex flex-wrap gap-2">
					{attachments.map((attachment) => {
						if (attachment.type === 'IMAGE') {
							return (
								<Dialog key={attachment.id}>
									<DialogTrigger asChild>
										<Image
											src={attachment.url}
											alt={attachment.title}
											width={160}
											height={160}
											className="hover:bg-primary-foreground dark:hover:bg-primary-foreground/10 h-[160px] w-[160px] rounded object-cover"
										/>
									</DialogTrigger>
									<ImageExpanderDialog imageSrc={attachment.url} />
								</Dialog>
							);
						}

						if (attachment.type === 'FILE') {
							return (
								<div
									key={attachment.id}
									className="bg-background text-muted-foreground flex h-min items-center gap-1 rounded-md p-2 shadow"
								>
									<FolderArchive className="size-5" />

									<span title={attachment.title} className="line-clamp-1 w-32 text-xs font-bold">
										{attachment.title}
									</span>

									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="ghost" size="xs" onClick={() => window.open(attachment.url, '_blank')}>
													<ArrowDownToLine />
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Baixar arquivo</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							);
						}

						if (attachment.type === 'DOCUMENT') {
							return (
								<div
									key={attachment.id}
									className="bg-background text-muted-foreground flex h-min items-center gap-1 rounded-md p-2 shadow"
								>
									<FileText className="size-5" />

									<span title={attachment.title} className="line-clamp-1 w-32 text-xs font-bold">
										{attachment.title}
									</span>

									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="ghost" size="xs" onClick={() => window.open(attachment.url, '_blank')}>
													<ArrowDownToLine />
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Baixar arquivo</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							);
						}
					})}
				</div>

				<div className="text-muted-foreground flex w-full items-center justify-end gap-0.5">
					<time className="text-xs hover:cursor-text">{dayjs(message.createdAt).format('HH:mm')}</time>
					{isOwn && <>{message.readAt ? <CheckCheck className="size-3.5" /> : <Check className="size-3" />}</>}
				</div>
			</li>
		</ContextMenuTrigger>
	);
}
