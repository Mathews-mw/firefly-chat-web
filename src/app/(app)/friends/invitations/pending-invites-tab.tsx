'use client';

import dayjs from 'dayjs';
import { toast } from 'sonner';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { errorHandler } from '@/_http/error-handler/error-handler';
import { getProfileNameInitials } from '@/utils/get-profile-name-initials';
import { acceptInvitation } from '@/_http/requests/friendships/accept-invitation';
import { rejectInvitation } from '@/_http/requests/friendships/reject-invitation';
import { listingUserPendingInvitations } from '@/_http/requests/friendships/listing-user-pending-invitations';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Check, Loader2, X } from 'lucide-react';

interface IProps {
	user: IUser;
	enabled: boolean;
}

export function PendingInviteTab({ user, enabled }: IProps) {
	const [parent] = useAutoAnimate();
	const queryClient = useQueryClient();

	const { data: invitations } = useQuery({
		queryKey: ['invitations', user?.id, 'PENDING'],
		queryFn: listingUserPendingInvitations,
		enabled,
	});

	const { mutateAsync: acceptInvitationFn, isPending: isPendingAcceptInvitation } = useMutation({
		mutationFn: async (invitationId: string) => await acceptInvitation({ invitationId }),
		onSuccess: async (_, variables) => {
			queryClient.setQueryData<IInvitationWithSender[]>(['invitations', user?.id, 'PENDING'], (invitations) => {
				return invitations?.filter((invitation) => invitation.id !== variables);
			});

			queryClient.setQueryData<{ amount: number }>(['invitations', user?.id, 'amount', 'PENDING'], (arg) => {
				if (arg) {
					return { amount: arg.amount - 1 };
				}

				return arg;
			});

			queryClient.invalidateQueries({
				queryKey: ['friends', user?.id],
			});

			toast.success('Convite aceito!');
		},
		onError: (error) => errorHandler({ error: error, showErrorCode: false }),
	});

	const { mutateAsync: rejectInvitationFn, isPending: isPendingRejectInvitation } = useMutation({
		mutationFn: async (invitationId: string) => await rejectInvitation({ invitationId }),
		onSuccess: async (_, variables) => {
			queryClient.setQueryData<IInvitationWithSender[]>(['invitations', user?.id, 'PENDING'], (invitations) => {
				return invitations?.filter((invitation) => invitation.id !== variables);
			});

			queryClient.setQueryData<{ amount: number }>(['invitations', user?.id, 'amount', 'PENDING'], (arg) => {
				if (arg) {
					return { amount: arg.amount - 1 };
				}

				return arg;
			});

			toast.success('Convite recusado!');
		},
		onError: (error) => errorHandler({ error: error, showErrorCode: false }),
	});

	return (
		<>
			<ul className="space-y-4" ref={parent}>
				{invitations
					? invitations.map((invite) => {
							const initials = getProfileNameInitials(invite.sender.name);
							const invitedAtFromNow = dayjs(invite.created_at).fromNow();
							const invitedAtFormatted = dayjs(invite.created_at).format('DD/MM/YYYY');

							return (
								<li key={invite.id}>
									<div className="flex w-full items-center justify-between">
										<div className="flex items-center gap-2">
											<Avatar className="size-8 rounded-lg">
												{invite.sender.avatar_url && (
													<AvatarImage src={invite.sender.avatar_url} alt={invite.sender.username} />
												)}
												<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
											</Avatar>

											<div className="flex flex-col">
												<span className="text-xs font-semibold">{invite.sender.name}</span>
												<time title={invitedAtFormatted} className="text-muted-foreground text-xs">
													{invitedAtFromNow}
												</time>
											</div>
										</div>

										<div>
											<Button
												variant="ghost"
												size="sm"
												disabled={isPendingAcceptInvitation || isPendingRejectInvitation}
												onClick={() => acceptInvitationFn(invite.id)}
											>
												{isPendingAcceptInvitation ? (
													<Loader2 className="text-muted-foreground animate-spin" />
												) : (
													<Check className="text-emerald-500" />
												)}
											</Button>

											<Button
												variant="ghost"
												size="sm"
												disabled={isPendingAcceptInvitation || isPendingRejectInvitation}
												onClick={() => rejectInvitationFn(invite.id)}
											>
												{isPendingRejectInvitation ? (
													<Loader2 className="text-muted-foreground animate-spin" />
												) : (
													<X className="text-rose-500" />
												)}
											</Button>
										</div>
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
					<p className="text-muted-foreground w-56 text-center text-xs">Você não tem pedidos de amizade no momento.</p>
				</div>
			)}
		</>
	);
}
