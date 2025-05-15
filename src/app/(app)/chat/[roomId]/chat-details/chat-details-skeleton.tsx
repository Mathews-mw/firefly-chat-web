import { Skeleton } from '@/components/ui/skeleton';

export function ChatDetailsSkeleton() {
	return (
		<div className="flex w-full flex-col gap-8">
			<span className="font-bold">Chat Details</span>

			<div className="flex w-full justify-between gap-2">
				<Skeleton className="size-10" />
				<Skeleton className="size-10" />
				<Skeleton className="size-10" />
				<Skeleton className="size-10" />
				<Skeleton className="size-10" />
			</div>

			<div className="space-y-2">
				<div className="flex w-full items-center justify-between">
					<div className="space-x-2">
						<span className="text-sm font-semibold">Fotos e vídeos</span>
					</div>

					<Skeleton className="h-3 w-16" />
				</div>

				<div className="flex w-full justify-between gap-2">
					<Skeleton className="size-[80px]" />
					<Skeleton className="size-[80px]" />
					<Skeleton className="size-[80px]" />
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex w-full items-center justify-between">
					<div className="space-x-2">
						<span className="text-sm font-semibold">Arquivos compartilhados</span>
					</div>

					<Skeleton className="h-3 w-16" />
				</div>

				<div className="flex w-full flex-col gap-4">
					{Array.from({ length: 3 }).map((_, i) => {
						return (
							<div key={i} className="flex items-center gap-2 rounded-lg">
								<Skeleton className="size-10" />

								<Skeleton className="h-3 w-full" />
							</div>
						);
					})}
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex w-full items-center justify-between">
					<div className="space-x-2">
						<span className="text-sm font-semibold">Links compartilhados</span>
					</div>

					<Skeleton className="h-3 w-16" />
				</div>

				<div className="flex w-full flex-col gap-4">
					{Array.from({ length: 3 }).map((_, i) => {
						return (
							<div key={i} className="flex items-center gap-2 rounded-lg">
								<Skeleton className="size-10" />

								<div className="flex w-full flex-col gap-2">
									<Skeleton className="h-2.5 w-36" />
									<Skeleton className="h-2 w-full" />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
