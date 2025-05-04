import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ChatItem() {
	return (
		<li className="hover:bg-muted/80 flex w-full cursor-pointer gap-2 rounded-md p-2">
			<Avatar className="h-10 w-10 rounded-lg">
				<AvatarImage src="https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu" alt="@shadcn" />
				<AvatarFallback className="rounded-lg">CN</AvatarFallback>
			</Avatar>

			<div className="space-y-0.5">
				<div className="flex w-full justify-between">
					<span className="text-sm font-semibold">Lydia Wilson</span>
					<time className="text-muted-foreground text-xs">00:53</time>
				</div>
				<p className="text-muted-foreground line-clamp-1 text-xs">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, accusamus cumque expedita, ea rerum sapiente
					quibusdam corrupti dicta suscipit unde tenetur quas laborum. Tempora neque omnis est excepturi velit et!
				</p>
			</div>
		</li>
	);
}
