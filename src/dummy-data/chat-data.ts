export interface IAuthor {
	id: string;
	name: string;
	avatarUrl: string;
}

export interface IChatItem {
	id: string;
	message: string;
	date: Date | string; // ISO string
	author: IAuthor;
}

export const chatData: Array<IChatItem> = [
	// dia 03/05/25
	{
		id: '1',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:40:34.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '2',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:40:45.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '3',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:40:55.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '4',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:41:05.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '5',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:41:10.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '6',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:41:27.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '7',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:41:34.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '8',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:41:39.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '9',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:41:44.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '10',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-03-03T23:42:14.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},

	// dia 04
	{
		id: '11',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:40:34.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '12',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:40:45.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '13',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:40:55.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '14',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:41:05.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '15',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:41:10.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '16',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:41:27.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '17',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:41:34.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '18',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:41:39.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '19',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:41:44.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '20',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:42:14.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},

	// dia 05
	{
		id: '21',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-04-03T23:40:34.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '22',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:40:45.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '23',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:40:55.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '24',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:41:05.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '25',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:41:10.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '26',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:41:27.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '27',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:41:34.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '28',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:41:39.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
	{
		id: '29',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:41:44.114Z',
		author: {
			id: 'ma001',
			name: 'Mathews Araújo',
			avatarUrl: 'https://1drv.ms/i/c/0852b71d1fb2ccf4/UQT0zLIfHbdSIIAI0u8BAAAAAN-irFBHrYxKLGY?width=1080&height=1072',
		},
	},
	{
		id: '30',
		message:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum velit earum optio facilis sequi consectetur, nam necessitatibus minima a asperiores, quasi reprehenderit quis porro ad tenetur magni rem amet rerum.',
		date: '2025-05-03T23:42:14.114Z',
		author: {
			id: 'rj002',
			name: 'Ruth Jacobs',
			avatarUrl: 'https://api.dicebear.com/9.x/thumbs/png?seed=Gobblu',
		},
	},
];
