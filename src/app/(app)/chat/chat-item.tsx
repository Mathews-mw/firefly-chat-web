'use client';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useRouter } from 'next/navigation';

import { useChat } from '@/context/chat-context';

import { useUser } from '@/context/user-context';
import { getProfileNameInitials } from '@/utils/get-profile-name-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip } from 'lucide-react';

dayjs.extend(isToday);

interface IProps {
	room: IRoomWithParticipants;
}

export function ChatItem({ room }: IProps) {
	const { selectRoomId } = useChat();
	const { user } = useUser();

	const navigate = useRouter();

	const participant = room.participants[0];

	function handleSelectRoom() {
		selectRoomId(room.id);
		navigate.push(`/chat/${room.id}`);
	}

	return (
		<li
			className="hover:bg-muted/80 flex w-full cursor-pointer gap-2 rounded-md p-2"
			onClick={() => handleSelectRoom()}
		>
			<Avatar className="h-10 w-10 rounded-lg">
				{participant.user.avatar_url && (
					<AvatarImage src={participant.user.avatar_url} alt={`@${participant.user.username}`} />
				)}
				<AvatarFallback className="rounded-lg">{getProfileNameInitials(participant.user.name)}</AvatarFallback>
			</Avatar>

			<div className="w-full space-y-0.5">
				<div className="flex w-full justify-between">
					<span className="text-sm font-semibold">{participant.user.name}</span>
					{room.chat_messages.length > 0 && (
						<time className="text-muted-foreground text-xs">
							{dayjs(room.chat_messages[0].created_at).isToday()
								? dayjs(room.chat_messages[0].created_at).format('HH:mm')
								: dayjs(room.chat_messages[0].created_at).format('DD/MM')}
						</time>
					)}
				</div>

				{room.chat_messages.length > 0 && (
					<p className="text-muted-foreground line-clamp-1 text-xs">
						{room.chat_messages[0].author.id === user?.id && <span>Você: </span>}{' '}
						{room.chat_messages[0].content === 'ATTACHMENT_MESSAGE' ? (
							<span className="inline-flex gap-2">
								Envio um anexo <Paperclip className="size-3.5" />
							</span>
						) : (
							room.chat_messages[0].content
						)}
					</p>
				)}
			</div>
		</li>
	);
}
