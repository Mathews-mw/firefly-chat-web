import { twMerge } from 'tailwind-merge';
import { Skeleton } from '../ui/skeleton';

export function ChatInitialLoadingSkeleton() {
	return (
		<div className="flex w-full flex-1 flex-col gap-2 px-4 py-2">
			<div className={`flex justify-end gap-2`}>
				<ul role="list" className="space-y-1.5">
					{Array.from({ length: 1 }, (_, i) => {
						return (
							<li
								key={i}
								role="listitem"
								className={twMerge([
									'w-[520px] space-y-1 rounded-md px-4 py-2 text-sm',
									'transform transition duration-300 ease-out',
									'bg-primary/10 ml-auto first:rounded-tr-none',
								])}
							>
								<Skeleton className="h-2 w-12" />

								<div className="space-y-1">
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
								</div>

								<div className="flex w-full justify-end">
									<Skeleton className="h-2 w-10" />
								</div>
							</li>
						);
					})}
				</ul>

				<Skeleton className="size-8 rounded-lg" />
			</div>

			<div className={`flex justify-start gap-2`}>
				<Skeleton className="size-8 rounded-lg" />
				<ul role="list" className="space-y-1.5">
					{Array.from({ length: 2 }, (_, i) => {
						return (
							<li
								key={i}
								role="listitem"
								className={twMerge([
									'w-[520px] space-y-1 rounded-md px-4 py-2 text-sm',
									'transform transition duration-300 ease-out',
									'bg-muted/50 mr-auto first:rounded-tl-none',
								])}
							>
								<Skeleton className="h-2 w-32" />

								<div className="space-y-1">
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
								</div>

								<div className="flex w-full justify-end">
									<Skeleton className="h-2 w-10" />
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className={`flex justify-end gap-2`}>
				<ul role="list" className="space-y-1.5">
					{Array.from({ length: 3 }, (_, i) => {
						return (
							<li
								key={i}
								role="listitem"
								className={twMerge([
									'w-[520px] space-y-1 rounded-md px-4 py-2 text-sm',
									'transform transition duration-300 ease-out',
									'bg-primary/10 ml-auto first:rounded-tr-none',
								])}
							>
								<Skeleton className="h-2 w-12" />

								<div className="space-y-1">
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
								</div>

								<div className="flex w-full justify-end">
									<Skeleton className="h-2 w-10" />
								</div>
							</li>
						);
					})}
				</ul>

				<Skeleton className="size-8 rounded-lg" />
			</div>

			<div className={`flex justify-start gap-2`}>
				<Skeleton className="size-8 rounded-lg" />
				<ul role="list" className="space-y-1.5">
					{Array.from({ length: 1 }, (_, i) => {
						return (
							<li
								key={i}
								role="listitem"
								className={twMerge([
									'w-[520px] space-y-1 rounded-md px-4 py-2 text-sm',
									'transform transition duration-300 ease-out',
									'bg-muted/50 mr-auto first:rounded-tl-none',
								])}
							>
								<Skeleton className="h-2 w-32" />

								<div className="space-y-1">
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
									<Skeleton className="h-2 w-full" />
								</div>

								<div className="flex w-full justify-end">
									<Skeleton className="h-2 w-10" />
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
