import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
	type ILibraryFoldersResponse,
	LibraryFoldersService,
} from "@/services/commons";

interface useGeLibraryFoldersByParentIdParameters {
	folderTypeId: number;
	parentId?: string;
}

interface useGeLibraryFoldersByParentIdReturn {
	item: ILibraryFoldersResponse["data"] | undefined;
	setItem: React.Dispatch<
		React.SetStateAction<ILibraryFoldersResponse["data"] | undefined>
	>;
	isLoading: boolean;
	isFetching: boolean;
	error: unknown;
}

export function useGeLibraryFoldersByParentId({
	parentId,
	folderTypeId,
}: useGeLibraryFoldersByParentIdParameters): useGeLibraryFoldersByParentIdReturn {
	const { data, isLoading, isFetching, error } =
		useQuery<ILibraryFoldersResponse>({
			queryKey: ["library-folders-parent", parentId],
			queryFn: () =>
				parentId
					? LibraryFoldersService.getLibraryFoldersByParentID({
							parentId,
							folderTypeId,
						})
					: Promise.reject("ID is required"),
			refetchOnWindowFocus: false,
			enabled: !!parentId,
		});

	const [item, setItem] = useState<ILibraryFoldersResponse["data"] | undefined>(
		data?.data
	);

	useEffect(() => {
		if (data) setItem(data.data);
	}, [data]);

	return { item, setItem, isLoading, isFetching, error };
}
