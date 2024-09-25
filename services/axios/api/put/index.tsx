import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { LibraryFoldersService } from "@/services/commons";

interface useUpdateLibraryFolderReturn {
	UpdateLibraryFolder: ({
		id,
		data,
	}: {
		id: string;
		data: { folderTypeId: number; name: string; parentId: string | null };
	}) => void;
	error: any;
}

export function useUpdateLibraryFolder(
	key?: string
): useUpdateLibraryFolderReturn {
	const queryClient = useQueryClient();

	const { mutate: UpdateLibraryFolder, error } = useMutation({
		mutationKey: ["update-library-folder", key],
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: { folderTypeId: number; name: string; parentId: string };
		}) => LibraryFoldersService.updateLibraryFolder({ id, data }),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ["library-folders"],
			});
			toast.success("Папка успешно отредактирована!");
		},
		onError: (error) => {
			console.log(error);
			const errorMessage = "При редактировании папка произошла ошибка";
			toast.error(JSON.stringify(errorMessage));
		},
	});

	//@ts-ignore
	return { UpdateLibraryFolder, error };
}
