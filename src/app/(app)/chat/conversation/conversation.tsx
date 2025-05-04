import { SenderMessagesList } from './sender-messages-list';
import { UserMessagesList } from './user-messages-list';

export function Conversation() {
	return (
		<div>
			<div className="flex w-full items-center justify-center">
				<time className="text-muted-foreground bg-muted/30 rounded-md p-2 text-xs">03 de Abril de 2025</time>
			</div>
			<ul role="list" className="space-y-4">
				<li>
					<UserMessagesList />
				</li>
				<li>
					<SenderMessagesList />
				</li>
				<li>
					<UserMessagesList />
				</li>
			</ul>
		</div>
	);
}
