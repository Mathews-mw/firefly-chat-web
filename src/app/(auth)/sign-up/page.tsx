'use client';

import Image from 'next/image';

import { SignUpForm } from './sign-up-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SignUp() {
	return (
		<div className="flex w-full justify-between gap-4">
			<div className="flex flex-col gap-8 rounded-lg border p-8 shadow-sm">
				<h4 className="text-center text-lg font-bold">Crie sua conta</h4>

				<div className="flex justify-center gap-4">
					<Button variant="outline" type="button">
						<Image src="/google-logo.png" alt="google-logo" width={22} height={22} />
						Google
					</Button>

					<Button variant="outline" type="button">
						<Image src="/github-logo.png" alt="github-logo" width={22} height={22} />
						Github
					</Button>

					<Button variant="outline" type="button">
						<Image src="/apple-logo.png" alt="github-logo" width={22} height={22} />
						Apple
					</Button>
				</div>

				<Separator />

				<p className="text-muted-foreground">Ou registre-se com seu e-mail</p>

				<SignUpForm />
			</div>

			<Image
				src="/group-chat-illustration.png"
				alt="group-chat"
				height={500}
				width={500}
				className="h-[500px] object-cover"
			/>
		</div>
	);
}
