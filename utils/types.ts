export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type getAnyTableProps = {
  select: string;
  orderColumn?: string;
  orderAscendingDirection?: boolean;
  from?: number;
  to?: number;
};
