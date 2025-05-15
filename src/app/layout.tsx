import './globals.css';

import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';
import { UserContextProvider } from '@/context/user-context';
import { TanstackQueryClientProvider } from '@/providers/tanstack-query-client-provider';
import { AppProvider } from '@/providers/app-provider';

dayjs.locale('pt-br');
dayjs.extend(utc);
dayjs.extend(relativeTime);

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

			<body className={`${inter.className} h-screen antialiased`}>
				<TanstackQueryClientProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<AppProvider>
							<UserContextProvider>{children}</UserContextProvider>
						</AppProvider>
					</ThemeProvider>
				</TanstackQueryClientProvider>

				<Toaster richColors closeButton duration={1000 * 10} />
			</body>
		</html>
	);
}
