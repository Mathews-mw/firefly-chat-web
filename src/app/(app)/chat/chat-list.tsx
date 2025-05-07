import { ChatItem } from './chat-item';

export function ChatList() {
	return (
		<div>
			<ul className="space-y-2">
				{Array.from({ length: 20 }, (_, i) => {
					return <ChatItem key={i} roomId={i.toString()} />;
				})}
			</ul>
		</div>
	);
}
