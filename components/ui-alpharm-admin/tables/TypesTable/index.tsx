import Skeleton from "@mui/material/Skeleton/Skeleton";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import { useEffect, useMemo, useRef } from "react";

import SearchNotFoundMessage from "../../Messages/SearchNotFoundMessage";

import styles from "./TypesTable.module.scss";

interface TypesTableProps<TData> {
	data?: TData[];
	columns: ColumnDef<TData>[];
	onEdit?: (id?: string) => void;
	onDelete?: (id?: string) => void;
	onCreate?: () => void;
	className?: string;
	cellConditionStyling?: {
		checkStr: string;
		style: string;
	};
	stylesForFirstCells?: {
		length: number;
		columnIndex: number;
		style: string;
	};

	hasNextPage?: boolean | undefined;
	isFetchingNextPage?: boolean;
	fetchNextPage?: () => void;
	lastOfTypeStyle?: string;
	showNotFoundMessage?: boolean;
}

const TypesTable = <TData extends object>({
	data = [],
	columns,
	onEdit,
	onDelete,
	className,
	stylesForFirstCells,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	lastOfTypeStyle,
	showNotFoundMessage,
}: TypesTableProps<TData>) => {
	const memoizedData = useMemo(
		() => data?.map((item) => ({ ...item, onEdit, onDelete })),
		[data, onEdit, onDelete]
	);

	const table = useReactTable({
		data: memoizedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!hasNextPage || isFetchingNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && fetchNextPage) {
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
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (showNotFoundMessage && data.length === 0)
		return (
			<SearchNotFoundMessage
				isTextCenter
				isPaddingTop
			/>
		);

	return (
		<>
			<div
				className={cn(
					"h-full max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin",
					className
				)}
			>
				<table className="w-full h-full border-collapse">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="text-left py-3 px-5 border-r border-primary-gray-light font-normal text-sm text-primary-gray-dark"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="border-y border-primary-gray-light hover:bg-color-inactive "
							>
								{row.getVisibleCells().map((cell, index) => {
									return (
										<td
											key={cell.id}
											className={cn(
												stylesForFirstCells &&
													cell.row.index < stylesForFirstCells.length &&
													index === stylesForFirstCells.columnIndex &&
													stylesForFirstCells?.style,

												stylesForFirstCells &&
													cell.row.index < stylesForFirstCells.length &&
													index === stylesForFirstCells.columnIndex &&
													styles["container"],

												"text-left p-5 border-r border-primary-gray-light",
												(!row.getVisibleCells()[index + 1] &&
													lastOfTypeStyle) ||
													"last-of-type:max-w-10"
											)}
										>
											{Array.isArray(cell.getValue()) ? (
												(cell.getValue() as Array<{ name: string } | string>)
													.length > 0 ? (
													(
														cell.getValue() as Array<{ name: string } | string>
													).map(
														(item: { name: string } | string, i: number) => {
															if (typeof item === "object" && item.name)
																return (
																	<div
																		className="font-light "
																		key={i}
																	>
																		{item.name}
																	</div>
																);

															if (typeof item === "string")
																return <div key={i}>{item}</div>;

															return <p>Error with item type.</p>;
														}
													)
												) : (
													<div>-</div>
												)
											) : typeof cell.getValue() === "object" &&
											  cell.getValue() !== null ? (
												JSON.stringify(cell.getValue())
											) : (
												flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)
											)}
										</td>
									);
								})}
							</tr>
						))}
						<tr>
							{columns.map((_, index) => (
								<td
									key={index}
									className="flex-1 text-center h-full p-5 border-r border-primary-gray-light"
								/>
							))}
						</tr>

						{isFetchingNextPage && (
							<tr>
								<td colSpan={columns.length}>
									<Skeleton height={56} />
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div ref={loadMoreRef} />
			</div>
		</>
	);
};

export default TypesTable;
