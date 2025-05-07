import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Footer } from './footer';

export default async function SignUpLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto grid min-h-screen max-w-[1440px] grid-rows-[auto_1fr_auto] px-40">
			<header className="flex w-full items-center justify-between py-8">
				<div className="flex items-center gap-2">
					<Image src="/firefly_logo.png" alt="logo" height={32} width={32} />
					<span className="font-bold">Firefly Chat</span>
				</div>

				<div className="flex h-5 items-center gap-2">
					<Button variant="ghost">
						<Link href="/sign-in">Entrar</Link>
					</Button>

					<Separator orientation="vertical" className="h-5" />

					<ThemeSwitcher />
				</div>
			</header>

			<main className="mx-auto mb-8 flex h-full w-full flex-1 flex-col items-center justify-center overflow-auto">
				{children}
			</main>

			<Footer />
		</div>
	);
}
