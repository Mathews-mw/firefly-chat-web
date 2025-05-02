import { isAuthenticated } from '@/auth/auth';
import { redirect } from 'next/navigation';

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isAuth = await isAuthenticated();

	if (!isAuth) {
		redirect('/sign-in');
	}

	return <>{children}</>;
}
