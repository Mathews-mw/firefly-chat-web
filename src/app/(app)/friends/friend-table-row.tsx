import { getProfileNameInitials } from '@/utils/get-profile-name-initials';

import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/status-badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { ChatBubbleOvalLeftEllipsisIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface IProps {
	friend: IFriendshipWithFriend;
	status: 'online' | 'offline';
}

export function FriendTableRow({ friend, status }: IProps) {
	const initials = getProfileNameInitials(friend.friend.name);

	return (
		<TableRow>
			<TableCell className="font-medium">
				<div className="flex gap-2">
					<div className="relative size-10">
						<Avatar className="size-10 rounded-lg">
							{friend.friend.avatar_url && <AvatarImage src={friend.friend.avatar_url} alt={friend.friend.username} />}
							<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
						</Avatar>
						<StatusBadge status={status} className="absolute -right-1 bottom-0" />
					</div>

					<div className="flex flex-col">
						<span className="text-sm font-semibold">{friend.friend.name}</span>
						<span className="text-muted-foreground text-xs">@{friend.friend.username}</span>
					</div>
				</div>
			</TableCell>

			<TableCell className="text-right">
				<Button size="sm" variant="ghost">
					<ChatBubbleOvalLeftEllipsisIcon className="size-6" />
				</Button>
			</TableCell>
			<TableCell className="w-[46px] text-right">
				<Button size="sm" variant="ghost">
					<EllipsisVerticalIcon className="size-6" />
				</Button>
			</TableCell>
		</TableRow>
	);
}
