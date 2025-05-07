'use client';

import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { getProfileNameInitials } from '@/utils/get-profile-name-initials';
import { listingUserSentInvitations } from '@/_http/requests/friendships/listing-user-sent-invitations';

import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteInvitation } from '@/_http/requests/friendships/delete-invitation';
import { toast } from 'sonner';
import { errorHandler } from '@/_http/error-handler/error-handler';

interface IProps {
	user: IUser;
	enabled: boolean;
}

export function SentInviteTab({ user, enabled }: IProps) {
	const [parent] = useAutoAnimate();
	const queryClient = useQueryClient();

	const { data: invitations } = useQuery({
		queryKey: ['invitations', user?.id, 'SENT'],
		queryFn: listingUserSentInvitations,
		enabled,
	});

	const { mutateAsync: deleteInvitationFn, isPending } = useMutation({
		mutationFn: async (invitationId: string) => await deleteInvitation({ invitationId }),
		onSuccess: async (_, variables) => {
			queryClient.setQueryData<IInvitationWithSender[]>(['invitations', user?.id, 'SENT'], (invitations) => {
				return invitations?.filter((invitation) => invitation.id !== variables);
			});

			toast.success('Convite deletado com sucesso!');
		},
		onError: (error) => errorHandler({ error: error, showErrorCode: false }),
	});

	return (
		<>
			<ul className="space-y-4" ref={parent}>
				{invitations
					? invitations.map((invite) => {
							const initials = getProfileNameInitials(invite.receiver.name);
							const invitedAtFromNow = dayjs(invite.created_at).fromNow();
							const invitedAtFormatted = dayjs(invite.created_at).format('DD/MM/YYYY');

							return (
								<li key={invite.id}>
									<div className="flex w-full items-center justify-between">
										<div className="flex items-center gap-2">
											<Avatar className="size-8 rounded-lg">
												{invite.receiver.avatar_url && (
													<AvatarImage src={invite.receiver.avatar_url} alt={invite.receiver.username} />
												)}
												<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
											</Avatar>

											<div className="flex flex-col">
												<span className="text-xs font-semibold">{invite.receiver.name}</span>
												<time title={invitedAtFormatted} className="text-muted-foreground text-xs">
													Enviado {invitedAtFromNow}
												</time>
											</div>
										</div>

										<Button
											variant="ghost"
											size="sm"
											disabled={isPending}
											onClick={() => deleteInvitationFn(invite.id)}
										>
											{isPending ? (
												<Loader2 className="text-muted-foreground animate-spin" />
											) : (
												<Trash2 className="text-muted-foreground" />
											)}
										</Button>
									</div>
								</li>
							);
						})
					: Array.from({ length: 4 }, (_, i) => {
							return (
								<li key={i}>
									<div className="flex w-full items-center justify-between">
										<div className="flex items-center gap-2">
											<Skeleton className="size-8 rounded-lg" />

											<div className="flex flex-col gap-1">
												<Skeleton className="h-3 w-24" />
												<Skeleton className="h-2 w-14" />
											</div>
										</div>
									</div>
								</li>
							);
						})}
			</ul>

			{invitations?.length === 0 && (
				<div className="flex w-full items-center justify-center p-2">
					<p className="text-muted-foreground w-64 text-center text-xs text-pretty">
						Você não tem pedidos enviados. Clique em &quot;Adicionar amigo&quot; para enviar pedidos de amizade.
					</p>
				</div>
			)}
		</>
	);
}
