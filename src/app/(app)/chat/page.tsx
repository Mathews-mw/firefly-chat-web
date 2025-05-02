import { getUserProfile } from '@/_http/requests/users/get-user-profile';
import { auth, isAuthenticated } from '@/auth/auth';

export default async function ChatPage() {
	// const user = await getUserProfile();

	const isAuth = await isAuthenticated();

	console.log('isAuth: ', isAuth);

	return (
		<div>
			<h1>Chats e Rooms</h1>
			{/* <pre>{JSON.stringify(user)}</pre> */}
		</div>
	);
}
