'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authEmitter } from '@/events/auth-events';

export function AppProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		const onLogout = () => {
			router.push('/api/auth/sign-out');
		};

		authEmitter.on('logout', onLogout);

		return () => {
			authEmitter.off('logout', onLogout);
		};
	}, [router]);

	return <>{children}</>;
}
