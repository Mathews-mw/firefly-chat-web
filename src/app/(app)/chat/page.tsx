import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import * as Chat from '@/components/chat';
import { groupByDate } from '@/utils/group-by-date';
import { chatData, IChatItem } from '@/dummy-data/chat-data';

export default async function ChatPage() {
	const groupedDateChat = groupByDate(chatData);

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex gap-4">
				<Avatar className="size-12 rounded-lg">
					<AvatarImage src="https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu" alt="@shadcn" />
					<AvatarFallback className="rounded-lg">CN</AvatarFallback>
				</Avatar>

				<div>
					<h4 className="text-lg font-bold">Ruth Jacobs</h4>
					<div className="flex items-center gap-1.5">
						<div className="size-2 rounded-full bg-emerald-500" />
						<span className="text-muted-foreground text-xs">Online</span>
					</div>
				</div>
			</div>

			<Chat.ChatComponent />
		</div>
	);
}
