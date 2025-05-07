import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export function FriendRowSkeleton() {
	return (
		<TableRow>
			<TableCell className="font-medium">
				<div className="flex gap-2">
					<Skeleton className="size-10 rounded-lg" />

					<div className="flex flex-col gap-2">
						<Skeleton className="h-4 w-36" />
						<Skeleton className="h-2 w-20" />
					</div>
				</div>
			</TableCell>

			<TableCell className="flex justify-end"></TableCell>
			<TableCell className="flex justify-end gap-2 text-right">
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
			</TableCell>
		</TableRow>
	);
}
