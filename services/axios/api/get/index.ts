import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
	type ILibraryFolder,
	type ILibraryFoldersResponse,
	LibraryFoldersService,
} from "@/services/commons";

interface IUseGetBricksProps {
	searchQuery?: string;
	id?: string | null;
	parentId?: string | null;
	folderTypeId?: number;
	key?: string | null;
}

interface useGetLibraryFoldersReturn {
	items: Array<ILibraryFolder> | undefined;
	setItems: React.Dispatch<
		React.SetStateAction<Array<ILibraryFolder> | undefined>
	>;
	isLoading: boolean;
}

export function useGetLibraryFolders({
	id,
	parentId,
	searchQuery,
	folderTypeId,
	key,
}: IUseGetBricksProps): useGetLibraryFoldersReturn {
	// console.log(id);
	const { data, isLoading } = useQuery<ILibraryFoldersResponse | undefined>({
		queryKey: ["library-folders", key],
		queryFn: () =>
			LibraryFoldersService.getLibraryFolders({
				searchQuery,
				id,
				parentId,
				folderTypeId,
			}),
		refetchOnWindowFocus: false,
	});

	const [items, setItems] = useState<Array<ILibraryFolder> | undefined>(
		data?.data
	);

	useEffect(() => {
		if (data) {
			setItems(data.data);
		}
	}, [data]);

	return { items, setItems, isLoading };
}
