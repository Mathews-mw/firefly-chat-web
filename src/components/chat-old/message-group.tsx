import { ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getProfileNameInitials } from '@/utils/get-profile-name-initials';

interface IMessageGroupProps {
	author: { id: string; name: string; avatarUrl: string };
	isOwn: boolean;
	showAvatar: boolean;
	children: ReactNode;
}

export function MessageGroup({ children, isOwn, showAvatar, author }: IMessageGroupProps) {
	const initials = getProfileNameInitials(author.name);

	return (
		<div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
			<div className="flex space-x-2">
				{!isOwn && (
					<Avatar className="size-8 rounded-lg">
						<AvatarImage src={author.avatarUrl} alt="@shadcn" />
						<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
					</Avatar>
				)}

				<ul role="list" className="space-y-1.5">
					{children /* MessageBubble dashed in */}
				</ul>

				{isOwn && (
					<Avatar className="size-8 rounded-lg">
						<AvatarImage src={author.avatarUrl} alt="@shadcn" />
						<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
					</Avatar>
				)}
			</div>
		</div>
	);
}
