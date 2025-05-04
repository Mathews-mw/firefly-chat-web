import { Window } from './window';
import { DateGroup } from './date-group';
import { MessageGroup } from './message-group';
import { MessageBubble } from './message-bubble';
import { groupByDate } from '@/utils/group-by-date';
import { chatData, IChatItem } from '@/dummy-data/chat-data';

export { DateGroup, MessageBubble, MessageGroup, Window };

export function ChatComponent() {
	const groupedDateChat = groupByDate(chatData);

	return (
		<Window>
			{groupedDateChat.map((group) => {
				return (
					<DateGroup key={group.date} date={group.date}>
						{/** Agrupar mensagens por autor sequencialmente */}
						{group.messages
							.reduce<
								{
									authorId: string;
									messages: IChatItem[];
								}[]
							>((acc, msg) => {
								const last = acc[acc.length - 1];

								if (last && last.authorId === msg.author.id) {
									last.messages.push(msg);
								} else {
									acc.push({ authorId: msg.author.id, messages: [msg] });
								}

								return acc;
							}, [])
							.map((grp, i) => {
								const isOwn = grp.authorId === 'ma001'; // Pegar do contexto de usuário

								return (
									<MessageGroup
										key={`${group.date}-${grp.authorId}-${i}`}
										author={grp.messages[0].author} //Como o grupo sempre terá o mesmo autor, não tem problema pegar o primeiro ([0])
										isOwn={isOwn}
										showAvatar={i === 0}
									>
										{grp.messages.map((msg, index) => (
											<MessageBubble
												author={msg.author}
												key={msg.id}
												message={msg.message}
												isOwn={isOwn}
												date={msg.date}
												showAvatar={index === 0}
											/>
										))}
									</MessageGroup>
								);
							})}
					</DateGroup>
				);
			})}
		</Window>
	);
}
