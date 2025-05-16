'use client';

import ReconnectingWebSocket from 'reconnecting-websocket';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { env } from '@/env';
import { useUser } from './user-context';

interface PresenceContextType {
	isUserOnline: (userId: string) => boolean;
	onlineUsers: Set<string>;
}

export const PresenceContext = createContext({} as PresenceContextType);

export function PresenceContextProvider({ children }: { children: ReactNode }) {
	const { user } = useUser();

	const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

	const wsRef = useRef<ReconnectingWebSocket | null>(null);

	const isUserOnline = (userId: string) => onlineUsers.has(userId);

	useEffect(() => {
		if (!user) return;

		const url = `${env.NEXT_PUBLIC_WS_BASE_URL}/ws/presence`;

		const ws = new ReconnectingWebSocket(url, [], {
			maxRetries: 5,
			maxReconnectionDelay: 1000 * 3, // 3 seconds
			connectionTimeout: 1000 * 10, // 10 seconds
		});

		wsRef.current = ws;

		ws.addEventListener('message', (ev) => {
			try {
				const msg = JSON.parse(ev.data);

				if (msg.event === 'presence') {
					const { userId: otherId, isOnline } = msg.payload as { userId: string; isOnline: boolean };

					setOnlineUsers((prev) => {
						const next = new Set(prev);

						if (isOnline) {
							next.add(otherId);
						} else {
							next.delete(otherId);
						}

						return next;
					});
				}
			} catch (error) {
				console.warn('Parser error: ', error);
			}
		});

		return () => {
			ws.close();
		};
	}, [user]);

	return <PresenceContext.Provider value={{ onlineUsers, isUserOnline }}>{children}</PresenceContext.Provider>;
}

export function usePresence() {
	const ctx = useContext(PresenceContext);
	if (!ctx) throw new Error('usePresence must be used inside of PresenceProvider');
	return ctx;
}
