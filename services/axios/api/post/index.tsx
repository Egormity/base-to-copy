import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { LibraryFoldersService } from '@/services/commons';

interface useCreateLibraryFolder {
  createLibraryFolder: (data: { data: any }) => void;

  error: unknown;
}

export function useCreateLibraryFolder(key?: string): useCreateLibraryFolder {
  const queryClient = useQueryClient();

  const { mutate: createLibraryFolder, error } = useMutation({
    mutationKey: ['create-library-folder', key],
    mutationFn: ({ data }: { data: any }) => LibraryFoldersService.createLibraryFolder(data),
    onSuccess() {
      ({
        queryKey: ['library-folders'],
      });
      toast.success('Папка успешно создана!');
    },
    onError: error => {
      const errorMessage = 'При создании папка произошла ошибка';
      console.log(error);
      toast.error(JSON.stringify(errorMessage));
    },
  });

  return { createLibraryFolder, error };
}
