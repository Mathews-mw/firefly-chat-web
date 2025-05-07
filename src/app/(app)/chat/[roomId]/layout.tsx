'use client';

import { ChatContextProvider } from '@/context/chat-context';
import { use } from 'react';

interface IProps {
	children: React.ReactNode;
	params: Promise<{
		roomId: string;
	}>;
}

export default function ChatLayout({ children, params }: IProps) {
	const { roomId } = use(params);

	return (
		<div>
			<ChatContextProvider
				jwtToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiTUVNQkVSIiwic3ViIjoiYjBhMTBmY2EtYzliMi00YjU4LTg0YmEtZWEwMTRlOTk2OTJhIiwiaWF0IjoxNzQ2NTc2MjUwLCJleHAiOjE3NDY2NjI2NTB9.PwvgSmxpHIukmtOr9UuKTNrfjKb4gWXU9iBb1I4jOfvdSJoXOHFT_YUG14Wg24A1BOiMqet0Lj2ELnFLNQ228M_4tj4vSFiuY04m-rKHsN9o4FBMT2sapMuIJFNWIjwwTshoAfd6gQcC7FGWm2rvPOw7kSu_1Yhs7lRtjqLzYpI9YVondKIEM_7-04DCajfbxPNoxWclbdcuixyWsJeGTcRc4jCsDSTwhLeUShyQyK8jeFpQ3Ciym_11gL2fWoEN_WgWp1VTRA2gEwWk_b7A29sX2bVxSI3sI9o384PM23EuQpnWz5VdQWXeSxhvB6trmsjDW6Qf36qsojB6YXYvKN3YsekneFzws-5mjkv32O43w4OOenIOlLbB4-9ZEf2KXAe2lAmGsWIDb_hhJ483VciLby_z-lvR2sjAaANqyJsmiMjTrvMXj-BmRCNcWAbUIBwcwZTfQ4UgF7VjkMgToKU7ZYP0FfPh5jLuY5d496VHkgvz0HZ_-KUBm1k6V2uEBz-kAwIf93E2K6_dv7zLbm9RbmL2YJJBgAhjI0ba7lD94je1Z1LIm13Uctpl1EQSH3uVmczwcDgN3v1HNWbFi40d4Ey_GDcLqRSK3Bnn-ab7fbUCfrGGqIjqGYGSed52hDY3dlc68Vkuf8Y4Yn3p53BH0caKAre98i0KBNj7Mfo"
				roomId={roomId}
			>
				{children}
			</ChatContextProvider>
		</div>
	);
}
