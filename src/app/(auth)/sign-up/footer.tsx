'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export function Footer() {
	const [language, setLanguage] = useState('pt-br');

	return (
		<footer className="mb-4 flex flex-col gap-4">
			<div className="flex items-start justify-between gap-2 px-10 text-sm">
				<div className="flex flex-col items-center">
					<Image src="/firefly_brand.png" alt="logo" height={84} width={84} />
					<p className="text-muted-foreground max-w-40 text-center text-xs text-pretty">
						Firefly Chat é simples e poderoso. Uma excelente opção de chat diário com amigos
					</p>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label className="font-bold text-orange-300">Firefly Chat</Label>

					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Home
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Login
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Criar conta
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						FAQ
					</Link>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label className="font-bold text-orange-300">Produto</Label>

					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Desenvolvedores
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Recursos
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Preço
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Ferramentas
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						FAQ
					</Link>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label className="font-bold text-orange-300">Firefly Chat</Label>

					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Home
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Login
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Criar conta
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Ferramentas
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						FAQ
					</Link>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label className="font-bold text-orange-300">Empresa</Label>

					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Nossa história
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Blog
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Leis & Privacidade
					</Link>
					<Link className="text-muted-foreground hover:text-foreground text-xs hover:underline" href="#">
						Contato
					</Link>
				</div>
			</div>

			<Separator />

			<div className="flex w-full items-center justify-between">
				<Select onValueChange={setLanguage} defaultValue={language}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Idioma" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="en-us">Inglês</SelectItem>
						<SelectItem value="pt-br">Português PT-BR</SelectItem>
					</SelectContent>
				</Select>

				<div className="flex items-center gap-4">
					<span className="text-muted-foreground text-xs">Firefly Chat &copy; - {new Date().getFullYear()}</span>

					<div className="flex gap-2">
						<Link href="#">
							<Instagram className="size-5" />
						</Link>
						<Link href="#">
							<Youtube className="size-5" />
						</Link>
						<Link href="#">
							<Facebook className="size-5" />
						</Link>
						<Link href="#">
							<Linkedin className="size-5" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
