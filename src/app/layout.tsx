import { TanstackQueryClientProvider } from '@/providers/tanstack-query-client-provider';
import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Firefly Chat - Web',
	description: 'Firefly web chat application',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<head>
				<meta name="apple-mobile-web-app-title" content="Firefly Chat" />

				<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
			</head>

			<body className={`${inter.className} antialiased`}>
				<TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>

				<Toaster richColors closeButton duration={1000 * 10} />
			</body>
		</html>
	);
}
