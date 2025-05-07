import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { sendInvitation } from '@/_http/requests/friendships/send-invitation';
import { useState } from 'react';
import { toast } from 'sonner';
import { errorHandler } from '@/_http/error-handler/error-handler';

export function InviteFriendDialog() {
	const [value, setValue] = useState<string>('');

	const { mutateAsync: sendInvitationFn, isPending } = useMutation({
		mutationFn: async () => sendInvitation({ username: value }),
		onSuccess: async () => {
			toast.success('Seu convite foi enviado com sucesso!');
		},
		onError: (error) => errorHandler({ error, showErrorCode: false }),
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Adicionar amigo</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Enviar convite para um amigo</DialogTitle>
					<DialogDescription>Você pode adicionar amigos com o nome de usuário do Firefly deles.</DialogDescription>
				</DialogHeader>

				<div>
					<Input
						name="username"
						id="username"
						placeholder="Nome de usuário"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" disabled={value === '' || isPending} onClick={() => sendInvitationFn()}>
							Enviar convite
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
