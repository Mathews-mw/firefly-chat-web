'use client';

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useMutation } from '@tanstack/react-query';
import { errorHandler } from '@/_http/error-handler/error-handler';
import { signInWithCredentials } from '@/_http/requests/auth/sign-in-with-credentials';

const signInForm = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type SignInForm = z.infer<typeof signInForm>;

export default function SignInPage() {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
	});

	const router = useRouter();

	const { mutateAsync: signInWithCredentialsFn, isPending } = useMutation({
		mutationFn: signInWithCredentials,
	});

	async function handleSignInForm(data: SignInForm) {
		try {
			await signInWithCredentialsFn({
				email: data.email,
				password: data.password,
			});

			router.replace('/chat');
		} catch (error) {
			errorHandler(error);
		}
	}

	return (
		<div className="grid min-h-dvh grid-cols-2 p-4">
			<div className="h-full">
				<div className="relative h-full p-4">
					<Image src="/firefly_logo.png" alt="logo" width={32} height={32} className="absolute top-5 left-5 z-50" />
					<Image src="/cover-image.png" alt="cover" fill className="overflow-hidden rounded-2xl object-cover" />
				</div>
			</div>

			<div className="flex h-full flex-col items-center justify-center">
				<Button variant="ghost" disabled={isSubmitting} className="text-foreground absolute top-8 right-8">
					<Link href="/">Voltar ao site</Link>
				</Button>

				<div className="flex w-[350px] flex-col gap-6">
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-semibold tracking-tighter">Boas-vindas!</h1>
						<p className="text-muted-foreground text-sm">Faça o seu login com as suas credenciais</p>
					</div>

					<form onSubmit={handleSubmit(handleSignInForm)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">E-mail</Label>

							<div>
								<Input id="email" placeholder="Insira seu e-mail cadastrado" type="text" {...register('email')} />
								<small className="text-red-400">{errors.email?.message}</small>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="name">Senha</Label>

							<div>
								<Input id="name" placeholder="Insira sua senha" type="password" {...register('password')} />
								<small className="text-red-400">{errors.password?.message}</small>
							</div>
						</div>

						<Button type="submit" className="flex w-full gap-2" disabled={isSubmitting || isPending}>
							Acessar métricas
							{(isSubmitting || isPending) && <Loader2 className="animate-spin" />}
						</Button>
					</form>

					<Separator />

					<p className="text-muted-foreground text-sm">Ou entre com um dos provedores</p>

					<div className="flex justify-center gap-4">
						<Button variant="outline" type="button">
							<Image src="/google-logo.png" alt="google-logo" width={22} height={22} />
							Google
						</Button>

						<Button variant="outline" type="button">
							<Image src="/github-logo.png" alt="github-logo" width={22} height={22} />
							Github
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
