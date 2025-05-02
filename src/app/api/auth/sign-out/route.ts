import { cookies as nextCookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const cookies = await nextCookies();

	const redirectUrl = request.nextUrl.clone();

	redirectUrl.pathname = '/sign-in';

	cookies.delete('@firefly_chat_session_token');

	return NextResponse.redirect(redirectUrl);
}
