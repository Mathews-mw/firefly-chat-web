import dayjs from 'dayjs';
import { ReactNode } from 'react';

interface IDateGroupProps {
	children: ReactNode;
	date: Date | string;
}

export function DateGroup({ children, date }: IDateGroupProps) {
	const dateFormatted = dayjs(date).format('DD [de] MMMM [de] YYYY');

	return (
		<div className="space-y-2">
			<div className="flex justify-center">
				<time className="text-muted-foreground bg-muted/30 rounded-md p-2 text-xs">{dateFormatted}</time>
			</div>

			<div className="space-y-2">{children /* MessageGroups */}</div>
		</div>
	);
}
