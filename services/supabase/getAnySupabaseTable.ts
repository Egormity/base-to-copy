import { supabase } from "./supabase";

export type getAnyTableProps = {
	select: string;
	orderColumn?: string;
	orderAscendingDirection?: boolean;
	from?: number;
	to?: number;
};

export async function getAnySupabaseTable({
	select,
	orderColumn,
	orderAscendingDirection = true,
	from,
	to,
}: getAnyTableProps) {
	let query = supabase.from(select).select("*", { count: "exact" });

	if (orderColumn && orderAscendingDirection)
		query = query.order(orderColumn, { ascending: orderAscendingDirection });

	if (from && to) query = query.range(from, to);

	const { data, error, count } = await query;

	if (error) {
		console.log("!!! ERRRRRROR !!!", error);
		throw new Error(`${select}(s) could not be loaded`);
	}

	return { data, count };
}
