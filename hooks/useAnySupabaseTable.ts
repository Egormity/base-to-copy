import { useQuery } from '@tanstack/react-query';
import { getAnyTableProps } from '../utils/types';
import { getAnySupabaseTable } from '../services/getAnySupabaseTable';

export function useAnySupabaseTable({
  select,
  orderColumn,
  orderAscendingDirection,
  from,
  to,
}: getAnyTableProps) {
  const {
    data: { data, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: [select, orderColumn, orderAscendingDirection, from, to],
    queryFn: () => getAnySupabaseTable({ select, orderColumn, orderAscendingDirection, from, to }),
  });

  return { data, error, isLoading, count };
}
