interface IUser {
	id: string;
	name: string;
	email: string;
	username: string;
	role: IRole;
	avatar_url?: string | null;
	is_active: boolean;
	created_at: string;
}
