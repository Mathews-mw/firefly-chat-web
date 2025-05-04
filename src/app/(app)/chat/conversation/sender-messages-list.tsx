import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const messages = [
	{
		id: '1',
		content:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
	},
	{
		id: '2',
		content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
	},
	{
		id: '3',
		content:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores.',
	},
	{
		id: '4',
		content:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
	},
];

export function SenderMessagesList() {
	return (
		<div className="flex flex-row gap-2">
			<Avatar className="size-8 rounded-lg">
				<AvatarImage src="https://api.dicebear.com/9.x/thumbs/png?seed=Ruth" alt="@shadcn" />
				<AvatarFallback className="rounded-lg">MA</AvatarFallback>
			</Avatar>

			<div>
				<ul role="list" className="space-y-2">
					{messages.map((message) => {
						return (
							<li
								key={message.id}
								className="bg-muted/80 w-full max-w-[420px] space-y-1 rounded-md p-2 first:rounded-tl-none"
							>
								<span className="text-xs font-bold">Ruth Jacobs</span>

								<p className="text-sm font-light">{message.content}</p>

								<div className="flex w-full justify-end">
									<time className="text-muted-foreground text-xs">10:45</time>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
