import { IChatItem } from '@/dummy-data/chat-data';
import { getProfileNameInitials } from '@/utils/get-profile-name-initials';

import { MessageBubble } from './message-bubble';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface IMessageGroupProps {
	author: { id: string; name: string; avatarUrl: string };
	isOwn: boolean;
	group: {
		authorId: string;
		messages: IChatItem[];
	};
}

export function MessageGroup({ isOwn, author, group }: IMessageGroupProps) {
	const initials = getProfileNameInitials(author.name);

	return (
		<div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
			<div className="flex space-x-2">
				{!isOwn && (
					<Avatar className="size-8 rounded-lg">
						<AvatarImage src={author.avatarUrl} alt={author.name} />
						<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
					</Avatar>
				)}

				<ul role="list" className="space-y-1.5">
					{group.messages.map((msg) => (
						<MessageBubble author={msg.author} key={msg.id} message={msg.message} isOwn={isOwn} date={msg.date} />
					))}
				</ul>

				{isOwn && (
					<Avatar className="size-8 rounded-lg">
						<AvatarImage src={author.avatarUrl} alt={author.name} />
						<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
					</Avatar>
				)}
			</div>
		</div>
	);
}
