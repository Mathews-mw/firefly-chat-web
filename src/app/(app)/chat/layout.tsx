import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatList } from './chat-list';

export default async function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid h-[calc(100vh-5rem)] min-h-0 grid-cols-4 gap-4">
			<ScrollArea className="bg-muted/50 flex h-full flex-col overflow-y-auto rounded-xl py-2 pr-4 pl-2">
				<ChatList />
			</ScrollArea>

			<div className="col-span-3 h-full p-2">{children}</div>
		</div>
	);
}
