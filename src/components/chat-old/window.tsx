import { ReactNode } from 'react';
import { ScrollArea } from '../ui/scroll-area';

export function Window({ children }: { children: ReactNode }) {
	return (
		<ScrollArea className="bg-muted/50 flex h-[calc(100vh-10rem)] min-h-0 flex-col overflow-y-auto rounded-xl p-4">
			{children /* DateGroups */}
		</ScrollArea>
	);
}
