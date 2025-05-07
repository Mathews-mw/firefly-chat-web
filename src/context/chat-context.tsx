import ReconnectingWebSocket from 'reconnecting-websocket';
import { createContext, ReactNode, useContext, useEffect, useReducer, useRef } from 'react';
import { env } from '@/env';

export interface ChatMessage {
	id: string;
	roomId: string;
	senderId: string;
	content: string;
	createdAt: string;
	author: { id: string; name: string; avatarUrl: string };
}

type ChatEvent =
	| { event: 'message'; payload: ChatMessage }
	| { event: 'userJoined'; payload: { roomId: string; userId: string } }
	| { event: 'userLeft'; payload: { roomId: string; userId: string } };

interface ChatState {
	status: 'connecting' | 'open' | 'closed' | 'error';
	messages: ChatMessage[];
}

type ChatAction =
	| { type: 'WS_OPEN' }
	| { type: 'WS_CLOSE' }
	| { type: 'WS_ERROR' }
	| { type: 'ADD_MESSAGE'; message: ChatMessage }
	| { type: 'RESET' };

interface ChatContextType {
	state: ChatState;
	send: (event: string, payload: unknown) => void;
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
		case 'RESET':
			return { status: 'connecting', messages: [] };
		default:
			return state;
	}
}

export function ChatContextProvider({
	children,
	roomId,
	jwtToken,
}: {
	children: ReactNode;
	roomId: string;
	jwtToken: string;
}) {
	const [state, dispatch] = useReducer(chatReducer, {
		status: 'connecting',
		messages: [],
	});

	const wsRef = useRef<ReconnectingWebSocket | null>(null);

	function send(event: string, payload: unknown) {
		if (state.status === 'open' && wsRef.current) {
			wsRef.current.send(JSON.stringify({ event, payload }));
		}
	}

	useEffect(() => {
		dispatch({ type: 'RESET' });

		const url = `${env.NEXT_PUBLIC_WS_BASE_URL}/ws/chat/members`;
		const ws = new ReconnectingWebSocket(`${url}?token=${jwtToken}`, [], {
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

				console.log('ctx msg: ', msg);

				if (msg.event === 'message') {
					dispatch({ type: 'ADD_MESSAGE', message: msg.payload });
				}

				// Lembrar de tratar userJoined/userLeft aqui!!!
			} catch (error) {
				console.log('Erro ao tentar fazer parser mensagem WS: ', error);
			}
		};

		ws.onerror = () => dispatch({ type: 'WS_ERROR' });
		ws.onclose = () => dispatch({ type: 'WS_CLOSE' });

		return () => {
			// sai da sala e fecha WS
			ws.send(JSON.stringify({ event: 'leaveRoom', payload: { roomId } }));
			ws.close();
		};
	}, [roomId, jwtToken]);

	return <ChatContext.Provider value={{ state, send }}>{children}</ChatContext.Provider>;
}

export function useChat() {
	const ctx = useContext(ChatContext);

	if (!ctx) {
		throw new Error('useChat must be used within a ChatContextProvider');
	}

	return ctx;
}
