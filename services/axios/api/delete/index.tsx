import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { LibraryFoldersService } from '@/services/commons';

interface useDeleteLibraryFolderReturn {
  deleteLibraryFolder: ({ id }: { id: string }) => void;
}

export function useDeleteLibraryFolder(key?: string): useDeleteLibraryFolderReturn {
  const queryClient = useQueryClient();

  const { mutate: deleteLibraryFolder } = useMutation({
    mutationKey: ['delete-library-folder', key],
    mutationFn: ({ id }: { id: string }) => LibraryFoldersService.deleteLibraryFolder(id),
    onSuccess() {
      ({
        queryKey: ['library-folders'],
      });
      toast.success('Папка была успешно удалена!');
    },
    onError: error => {
      console.log(error);
      toast.error('При удалении папки произошла ошибка');
    },
  });

  return { deleteLibraryFolder };
}
