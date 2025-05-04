import { chatData } from '@/dummy-data/chat-data';
import { groupByDate } from '@/utils/group-by-date';

import { Window } from './window';
import { DateGroup } from './date-group';
import { MessageGroup } from './message-group';
import { MessageBubble } from './message-bubble';

export { DateGroup, MessageBubble, MessageGroup, Window };

export function ChatComponent() {
	const chatGroupedByDate = groupByDate(chatData);

	return (
		<Window>
			{chatGroupedByDate.map((group) => {
				return <DateGroup key={group.date.toString()} group={group} />;
			})}
		</Window>
	);
}
