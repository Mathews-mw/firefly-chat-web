'use client';

import { getUserProfile } from '@/_http/requests/users/get-user-profile';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface UserContextType {
	user?: IUser;
	isLoading: boolean;
	isError?: boolean;
	refetch: () => void;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
	const {
		data: user,
		isLoading,
		isError,
		refetch,
	} = useQuery<IUser>({
		queryKey: ['profile'],
		queryFn: () => getUserProfile(),
		staleTime: 1000 * 60 * 60, // 1h
		retry: false,
	});

	return <UserContext.Provider value={{ user, isLoading, isError, refetch }}>{children}</UserContext.Provider>;
}

export function useUser() {
	const ctx = useContext(UserContext);

	if (!ctx) {
		throw new Error('useUser must be used within a UserProvider');
	}

	return ctx;
}
