import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { signOut } from '@/_http/requests/auth/sign-out';
import { useRouter } from 'next/navigation';
import { errorHandler } from '@/_http/error-handler/error-handler';
import { Loader2 } from 'lucide-react';

export function SignoutDialog() {
	const navigate = useRouter();

	const { mutateAsync: signOutFn, isPending } = useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			navigate.replace('/');
		},
		onError: (error) => errorHandler({ error: error }),
	});

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Certeza que deseja sair?</DialogTitle>
				<DialogDescription>Essa ação irá encerrar sua sessão no Firefly Chat.</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline" disabled={isPending}>
						Cancelar
					</Button>
				</DialogClose>

				<Button disabled={isPending} onClick={() => signOutFn()}>
					{isPending && <Loader2 className="animate-spin" />}
					Sair
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
