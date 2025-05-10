import { Skeleton } from '@/components/ui/skeleton';

export function ChatItemSkeleton() {
	return (
		<li className="w-full p-2">
			<div className="flex w-full gap-2">
				<Skeleton className="h-10 w-12 rounded-lg" />

				<div className="flex w-full flex-col space-y-2">
					<div className="flex justify-between">
						<Skeleton className="h-3 w-36" />
						<Skeleton className="h-2 w-12" />
					</div>

					<Skeleton className="h-2 w-full" />
				</div>
			</div>
		</li>
	);
}
