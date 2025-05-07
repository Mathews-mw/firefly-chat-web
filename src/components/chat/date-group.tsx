import dayjs from 'dayjs';

import { IDateGroup } from '@/utils/group-by-date';

import { MessageGroup } from './message-group';
import { ChatMessage } from '@/context/chat-context';

interface IDateGroupProps {
	group: IDateGroup;
	user: IUser;
}

export function DateGroup({ group, user }: IDateGroupProps) {
	const dateFormatted = dayjs(group.date).format('DD [de] MMMM [de] YYYY');

	console.log('date group: ', group);

	const chatGroup = group.messages.reduce<
		{
			authorId: string;
			messages: ChatMessage[];
		}[]
	>((acc, msg) => {
		const last = acc[acc.length - 1];
		console.log('inside reduce: ', last);

		if (last && last.authorId === msg.author.id) {
			last.messages.push(msg);
		} else {
			acc.push({ authorId: msg.author.id, messages: [msg] });
		}

		return acc;
	}, []);

	return (
		<div className="mx-auto max-w-[80%] space-y-2">
			<div className="mt-4 flex justify-center">
				<time className="text-muted-foreground bg-muted/30 rounded-md p-2 text-xs">{dateFormatted}</time>
			</div>

			<div className="space-y-2">
				{chatGroup.map((grp, i) => {
					const isOwn = grp.authorId === user.id;

					return (
						<MessageGroup
							key={`${group.date}-${grp.authorId}-${i}`}
							author={grp.messages[0].author}
							isOwn={isOwn}
							group={grp}
						/>
					);
				})}
			</div>
		</div>
	);
}
