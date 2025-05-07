interface IFriendship {
	id: string;
	user_id: string;
	friend_id: string;
	created_at: string;
}

interface IFriendshipWithFriend extends IFriendship {
	friend: IUser;
}
