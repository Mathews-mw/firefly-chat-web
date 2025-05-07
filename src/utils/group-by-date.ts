import dayjs from 'dayjs';

interface ChatMessage {
	id: string;
	roomId: string;
	senderId: string;
	content: string;
	createdAt: string;
	author: { id: string; name: string; avatarUrl: string };
}

export interface IDateGroup {
	date: string | Date;
	messages: ChatMessage[];
}

export function groupByDate(data: ChatMessage[]): IDateGroup[] {
	const map = data.reduce<Record<string, IDateGroup>>((acc, item) => {
		// transforma o ISO em Date e formata só a parte do dia
		const dt = dayjs(item.createdAt);
		const key = dt.format('YYYY-MM-DD'); // chave “2025-05-03”

		if (!acc[key]) {
			acc[key] = { date: key, messages: [] };
		}

		acc[key].messages.push(item);

		return acc;
	}, {});

	// transforma em array ordenado por date
	return Object.values(map).sort((a, b) => (a.date < b.date ? -1 : 1));
}
