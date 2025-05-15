import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useQuery } from '@tanstack/react-query';

import { getRoomDetails } from '@/_http/requests/chat/get-room-details';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatDetailsSkeleton } from './chat-details-skeleton';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ImageExpanderDialog } from '@/components/image-expander-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
	ArrowDownToLine,
	Bell,
	CalendarDays,
	FileText,
	FolderArchive,
	Globe,
	Share2,
	Star,
	Trash2,
} from 'lucide-react';

interface IProps {
	isOpen: boolean;
	roomId: string;
}

export function ChatDetails({ isOpen, roomId }: IProps) {
	const { data } = useQuery({
		queryKey: ['chat', 'details', roomId],
		queryFn: async () => getRoomDetails({ roomId, isPrivate: true }),
		enabled: isOpen,
	});

	return (
		<ScrollArea
			className={twMerge(
				`h-[calc(100vh-6rem)] min-h-0 overflow-y-auto transition-[width] duration-250 ease-in-out`,
				isOpen ? 'w-[420px] py-3' : 'w-0 p-0'
			)}
		>
			{data ? (
				<div className="flex w-full flex-col gap-8">
					<span className="font-bold">Chat Details</span>

					<div className="flex w-full justify-between gap-2">
						<Button variant="secondary" size="sm">
							<Bell className="size-5" />
						</Button>

						<Button variant="secondary" size="sm">
							<Star className="size-5" />
						</Button>

						<Button variant="secondary" size="sm">
							<Share2 className="size-5" />
						</Button>

						<Button variant="secondary" size="sm">
							<CalendarDays className="size-5" />
						</Button>

						<Button variant="secondary" size="sm">
							<Trash2 className="size-5 text-rose-500" />
						</Button>
					</div>

					<div className="space-y-2">
						<div className="flex w-full items-center justify-between">
							<div className="space-x-2">
								<span className="text-sm font-semibold">Fotos e vídeos</span>
								{data.attachments.IMAGE && data.attachments.IMAGE.length > 0 && (
									<span className="text-muted-foreground text-xs">{data.attachments.IMAGE.length}</span>
								)}
							</div>

							<Button variant="link" size="xs" className="text-muted-foreground text-xs">
								Ver todos
							</Button>
						</div>

						{data.attachments.IMAGE && data.attachments.IMAGE.length > 0 ? (
							<div className="flex w-full justify-between gap-2">
								{data.attachments.IMAGE.slice(0, 4).map((image) => {
									return (
										<Dialog key={image.id}>
											<DialogTrigger asChild>
												<Image
													key={image.id}
													src={image.url}
													alt=""
													height={80}
													width={80}
													className="hover:bg-primary-foreground dark:hover:bg-primary-foreground/10 rounded-lg"
												/>
											</DialogTrigger>
											<ImageExpanderDialog imageSrc={image.url} />
										</Dialog>
									);
								})}
							</div>
						) : (
							<div>
								<p className="text-muted-foreground text-sm">Não há imagens compartilhadas ainda</p>
							</div>
						)}
					</div>

					<div className="space-y-2">
						<div className="flex w-full items-center justify-between">
							<div className="space-x-2">
								<span className="text-sm font-semibold">Arquivos compartilhados</span>
								{(data.attachments.FILE || data.attachments.DOCUMENT) && (
									<span className="text-muted-foreground text-xs">
										{Array.from([...data.attachments.FILE!, ...data.attachments.DOCUMENT!]).length}
									</span>
								)}
							</div>

							<Button variant="link" size="xs" className="text-muted-foreground text-xs">
								Ver todos
							</Button>
						</div>

						{data.attachments.FILE || data.attachments.DOCUMENT ? (
							<div className="flex w-full flex-col gap-4">
								{Array.from([...data.attachments.FILE!, ...data.attachments.DOCUMENT!])
									.slice(0, 3)
									.map((file) => {
										return (
											<div key={file.id} className="flex items-center gap-2 rounded-lg">
												<div className="bg-muted rounded-lg p-2.5">
													{file.type === 'FILE' ? (
														<FolderArchive className="size-5" />
													) : (
														<FileText className="size-5" />
													)}
												</div>

												<div className="flex w-full items-center justify-between gap-2">
													<span className="line-clamp-1 text-xs">{file.title}</span>

													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger asChild>
																<Button variant="ghost" size="xs" onClick={() => window.open(file.url, '_blank')}>
																	<ArrowDownToLine />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Baixar arquivo</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</div>
											</div>
										);
									})}
							</div>
						) : (
							<div>
								<p className="text-muted-foreground text-sm">Não há arquivos compartilhados ainda</p>
							</div>
						)}
					</div>

					<div className="space-y-2">
						<div className="flex w-full items-center justify-between">
							<div className="space-x-1">
								<span className="text-sm font-semibold">Links compartilhados</span>
								<span className="text-muted-foreground text-xs">52</span>
							</div>

							<Button variant="link" size="xs" className="text-muted-foreground text-xs">
								Ver todos
							</Button>
						</div>

						<div className="flex w-full flex-col gap-4">
							<Link href="https://dribbble.com" target="_blank" className="group flex items-center gap-2 rounded-lg">
								<div className="bg-muted rounded-lg p-2.5">
									<Globe className="size-5" />
								</div>

								<div className="text-xs">
									<span className="line-clamp-1">Dribbble</span>

									<span className="text-muted-foreground line-clamp-1 group-hover:underline">https://dribbble.com</span>
								</div>
							</Link>

							<Link href="https://dribbble.com" target="_blank" className="group flex items-center gap-2 rounded-lg">
								<div className="bg-muted rounded-lg p-2.5">
									<Globe className="size-5" />
								</div>

								<div className="text-xs">
									<span className="line-clamp-1">Dribbble</span>

									<span className="text-muted-foreground line-clamp-1 group-hover:underline">https://dribbble.com</span>
								</div>
							</Link>

							<Link
								href="https://ui.shadcn.com/docs/components/sidebar#controlled-sidebar"
								target="_blank"
								className="group flex items-center gap-2 rounded-lg"
							>
								<div className="bg-muted rounded-lg p-2.5">
									<Globe className="size-5" />
								</div>

								<div className="text-xs">
									<span className="line-clamp-1">Shadcn/ui</span>

									<p
										title="https://ui.shadcn.com/docs/components/sidebar#controlled-sidebar"
										className="text-muted-foreground line-clamp-1 max-w-[245px] group-hover:underline"
									>
										https://ui.shadcn.com/docs/components/sidebar#controlled-sidebar
									</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			) : (
				<ChatDetailsSkeleton />
			)}
		</ScrollArea>
	);
}
