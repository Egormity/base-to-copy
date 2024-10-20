import { useEffect, useRef } from "react";

interface IUseGetMorePages {
	fetchNextPage?: () => void;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
}

export const useGetMorePages = ({
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: IUseGetMorePages) => {
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!fetchNextPage || !hasNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
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

	return {
		loadMoreRef,
	};
};
