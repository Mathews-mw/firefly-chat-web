import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1>Boas-vindas ao Firefly Chat</h1>
			<Button asChild>
				<Link href="/sign-in">Entrar</Link>
			</Button>
		</div>
	);
}
