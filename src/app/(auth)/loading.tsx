import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2">
			<p>Carregando...</p>
			<Loader2 className="text-primary h-8 w-8 animate-spin" />
			<p>Por favor, aguarde</p>
		</div>
	);
}
