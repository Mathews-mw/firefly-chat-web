import ReconnectingWebSocket from 'reconnecting-websocket';
import { createContext, ReactNode, useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';

import { env } from '@/env';

export interface ChatMessage {
	id: string;
	roomId: string;
	senderId: string;
	content: string;
	createdAt: Date;
	readAt?: Date;
	author: { id: string; name: string; avatarUrl?: string };
}

type ChatEvent =
	| { event: 'userJoined'; payload: { roomId: string; userId: string } }
	| { event: 'userLeft'; payload: { roomId: string; userId: string } }
	| { event: 'message'; payload: { roomId: string; message: ChatMessage } }
	| { event: 'sendMessage'; payload: { roomId: string; content: string } }
	| { event: 'markAsRead'; payload: { roomId: string; messageIds: Array<string> } };

interface ChatState {
	status: 'connecting' | 'open' | 'closed' | 'error';
	messages: ChatMessage[];
}

type ChatAction =
	| { type: 'WS_OPEN' }
	| { type: 'WS_CLOSE' }
	| { type: 'WS_ERROR' }
	| { type: 'ADD_MESSAGE'; message: ChatMessage }
	| { type: 'MARK_AS_READ'; payload: { roomId: string; messageIds: Array<string> } }
	| { type: 'RESET' };

interface ChatContextType {
	state: ChatState;
	send: <K extends keyof ChatEvent>(event: ChatEvent[K], payload: unknown) => void;
	// send: (event: string, payload: unknown) => void;
	roomId?: string;
	selectRoomId: (room?: string) => void;
}

export const ChatContext = createContext({} as ChatContextType);

function chatReducer(state: ChatState, action: ChatAction): ChatState {
	switch (action.type) {
		case 'WS_OPEN':
			return { ...state, status: 'open' };
		case 'WS_CLOSE':
			return { ...state, status: 'closed' };
		case 'WS_ERROR':
			return { ...state, status: 'error' };
		case 'ADD_MESSAGE':
			return { ...state, messages: [...state.messages, action.message] };
		case 'MARK_AS_READ':
			const { messageIds } = action.payload;

			return {
				...state,
				messages: state.messages.map((msg) => {
					// somente atualize as mensagens marcadas e que não tenham sido lidas antes
					if (messageIds.includes(msg.id)) {
						return { ...msg, readAt: msg.readAt ?? new Date() };
					}
					return msg;
				}),
			};
		case 'RESET':
			return { status: 'connecting', messages: [] };
		default:
			return state;
	}
}

export function ChatContextProvider({ children }: { children: ReactNode }) {
	const [roomId, setRoomId] = useState<string | undefined>(undefined);

	const [state, dispatch] = useReducer(chatReducer, {
		status: 'connecting',
		messages: [],
	});

	const wsRef = useRef<ReconnectingWebSocket | null>(null);

	const selectRoomId = useCallback((roomId?: string) => {
		setRoomId(roomId);
	}, []);

	function send<K extends keyof ChatEvent>(event: ChatEvent[K], payload: unknown) {
		if (state.status === 'open' && wsRef.current) {
			wsRef.current.send(JSON.stringify({ event, payload }));
		}
	}

	useEffect(() => {
		dispatch({ type: 'RESET' });

		if (!roomId) return;

		const url = `${env.NEXT_PUBLIC_WS_BASE_URL}/ws/chat/members`;
		const ws = new ReconnectingWebSocket(url, [], {
			maxRetries: 5,
			maxReconnectionDelay: 1000 * 3, // 3 seconds
			connectionTimeout: 1000 * 10, // 10 seconds
		});

		wsRef.current = ws;

		ws.addEventListener('open', () => {
			dispatch({ type: 'WS_OPEN' });
			// entra na sala
			ws.send(JSON.stringify({ event: 'joinRoom', payload: { roomId } }));
		});

		ws.onmessage = (ev) => {
			try {
				const msg: ChatEvent = JSON.parse(ev.data);

				console.log('ctx receive msg: ', msg);

				if (msg.event === 'message') {
					dispatch({ type: 'ADD_MESSAGE', message: msg.payload.message });
				}

				if (msg.event === 'markAsRead') {
					console.log('dispatch event markAsRead: ', msg.payload);
					dispatch({ type: 'MARK_AS_READ', payload: { roomId, messageIds: msg.payload.messageIds } });
				}

				// Lembrar de tratar userJoined/userLeft aqui!!!
			} catch (error) {
				console.warn('Erro ao tentar fazer parser mensagem WS: ', error);
			}
		};

		ws.onerror = (error) => {
			console.warn('websocket error: ', error);
			dispatch({ type: 'WS_ERROR' });
		};

		ws.onclose = () => dispatch({ type: 'WS_CLOSE' });

		return () => {
			// sai da sala e fecha WS
			ws.send(JSON.stringify({ event: 'leaveRoom', payload: { roomId: roomId } }));
			setRoomId(undefined);
			ws.close();
		};
	}, [roomId, selectRoomId]);

	return <ChatContext.Provider value={{ state, send, roomId, selectRoomId }}>{children}</ChatContext.Provider>;
}

export function useChat() {
	const ctx = useContext(ChatContext);

	if (!ctx) {
		throw new Error('useChat must be used within a ChatContextProvider');
	}

	return ctx;
}
