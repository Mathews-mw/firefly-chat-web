'use client';

import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useUser } from '@/context/user-context';
import { listingUserFriends } from '@/_http/requests/friendships/listing-user-friends';

import { Filters } from './filters';
import { InvitationsDropdown } from './invitations/invitations-dropdown';
import { FriendTableRow } from './friend-table-row';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/pagination';
import { FriendRowSkeleton } from './friend-row-skeleton';
import { InviteFriendDialog } from './invite-friend-dialog';
import { Table, TableBody, TableCaption } from '@/components/ui/table';

import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function FriendsPage() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const searchQueryParams = searchParams.get('search') ?? undefined;
	const statusParams = searchParams.get('status') ?? 'all';
	const currentPageParams = z.coerce.number().parse(searchParams.get('page') ?? '1');
	const perPageParams = z.union([z.literal('all'), z.coerce.number()]).parse(searchParams.get('perPage') ?? '10');

	const { user } = useUser();

	const { data, isFetching } = useQuery({
		queryKey: ['friends', user?.id, currentPageParams, perPageParams, searchQueryParams],
		queryFn: async () =>
			listingUserFriends({ page: currentPageParams, perPage: perPageParams, search: searchQueryParams }),
		enabled: !!user,
	});

	function handlePaginate(page: number) {
		params.set('page', page.toString());
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2">
				<UserGroupIcon className="text-muted-foreground size-7 fill-current" />
				<h3 className="text-lg font-bold">Seus amigos</h3>
			</div>

			<div className="flex justify-between gap-2">
				<Filters isFetching={isFetching} />

				<div className="flex gap-2">
					<InvitationsDropdown />
					<InviteFriendDialog />
				</div>
			</div>

			<div className="flex flex-col gap-2">
				{data ? (
					<span className="text-muted-foreground text-sm">Todos amigos - {data?.pagination.total_occurrences}</span>
				) : (
					<Skeleton className="h-3 w-36" />
				)}
				<Table>
					<TableCaption>Lista de amigos</TableCaption>

					{data ? (
						<TableBody>
							{data?.friends.map((friend) => {
								return <FriendTableRow key={friend.id} friend={friend} status="online" />;
							})}
						</TableBody>
					) : (
						<TableBody>
							{Array.from({ length: 5 }, (_, i) => {
								return <FriendRowSkeleton key={i} />;
							})}
						</TableBody>
					)}
				</Table>
			</div>

			{data && (
				<div className="flex w-full justify-end">
					<Pagination
						currentPage={data.pagination.page}
						perPage={data.pagination.per_page}
						totalCount={data.pagination.total_occurrences}
						totalPages={data.pagination.total_pages}
						onPageChange={(page) => handlePaginate(page)}
						disableTotalAmountLabel
					/>
				</div>
			)}
		</div>
	);
}
