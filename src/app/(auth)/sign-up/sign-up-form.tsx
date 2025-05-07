'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { errorHandler } from '@/_http/error-handler/error-handler';
import { createUserAccount } from '@/_http/requests/users/create-user-account';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TextInput } from '@/components/text-input';
import { useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { toast } from 'sonner';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { PasswordInput } from '@/components/password-input';

const createUserAccountSchema = z.object({
	name: z.string().min(1, { message: 'Por favor, preencha seu nome completo' }),
	username: z.string().min(2, { message: 'Por favor, forneça um nome de usuário' }),
	email: z.string().min(1, { message: 'Por favor, preencha seu e-mail' }).email({ message: 'E-mail inválido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	confirmPassword: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type CreateUserAccountForm = z.infer<typeof createUserAccountSchema>;

export function SignUpForm() {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<CreateUserAccountForm>({
		resolver: zodResolver(createUserAccountSchema),
	});

	const [acceptTerms, setAcceptTerms] = useState<CheckedState>(false);

	const router = useRouter();

	const { mutateAsync: createUserAccountFn, isPending } = useMutation({
		mutationFn: createUserAccount,
	});

	async function handleCreateUserAccountForm(data: CreateUserAccountForm) {
		if (!acceptTerms) {
			return toast.warning('Para criar seu cadastro, você deve ler os termos e condições para aceitá-los');
		}

		if (data.password !== data.confirmPassword) {
			return toast.warning('As senhas não conferem.');
		}

		try {
			await createUserAccountFn({
				email: data.email,
				name: data.name,
				username: data.username,
				password: data.password,
			});

			toast.success('Cadastro realizado som sucesso');

			router.replace('/sign-in');
		} catch (error) {
			errorHandler({ error: error });
		}
	}

	return (
		<form onSubmit={handleSubmit(handleCreateUserAccountForm)} className="flex flex-col gap-4">
			<div>
				<Input placeholder="E-mail" {...register('email')} />
				<small className="text-xs text-red-400">{errors.email?.message}</small>
			</div>

			<div className="flex w-full gap-2">
				<div className="w-full">
					<Input placeholder="Nome completo" {...register('name')} />
					<small className="text-xs text-red-400">{errors.name?.message}</small>
				</div>

				<div className="w-full">
					<TextInput placeholder="Nome do usuário" prefix="@" {...register('username')} />
					<small className="text-xs text-red-400">{errors.username?.message}</small>
				</div>
			</div>

			<div className="flex gap-2">
				<div className="w-full">
					<PasswordInput placeholder="Senha" {...register('password')} />
					<small className="text-xs text-red-400">{errors.password?.message}</small>
				</div>

				<div className="w-full">
					<PasswordInput placeholder="Confirmar senha" {...register('confirmPassword')} />
					<small className="text-xs text-red-400">{errors.confirmPassword?.message}</small>
				</div>
			</div>

			<div className="items-top flex space-x-2">
				<Checkbox id="terms1" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
				<div className="grid gap-1.5 leading-none">
					<label
						htmlFor="terms1"
						className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Aceitar termos e condições
					</label>
					<p className="text-muted-foreground text-sm">
						Você concorda com nossos{' '}
						<Link className="text-foreground underline" href="#">
							Termos de Serviço
						</Link>{' '}
						e{' '}
						<Link href="#" className="text-foreground underline">
							Política de Privacidade
						</Link>
						.
					</p>
				</div>
			</div>

			<Button type="submit" disabled={isPending || isSubmitting}>
				{(isPending || isSubmitting) && <Loader2 className="animate-spin" />}
				Criar conta
			</Button>
		</form>
	);
}
