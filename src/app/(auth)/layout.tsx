import { isAuthenticated } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function SessionLayout({ children }: { children: ReactNode }) {
	const isAuth = await isAuthenticated();

	if (isAuth) {
		redirect('/home');
	}

	return <>{children}</>;
}
