import { useEffect, useRef } from "react";

export const useLoadMoreItems = ({
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: {
	fetchNextPage: () => Promise<void>;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
}) => {
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!fetchNextPage || !hasNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage().catch((error) => console.log(error));
				}
			},
			{
				root: null,
				rootMargin: "100px",
				threshold: 0,
			}
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	return { loadMoreRef };
};
