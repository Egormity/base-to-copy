import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import { useMemo } from "react";

import { ButtonCreatePlus } from "../../inputs";

interface TypesTableProps<TData> {
	data?: TData[];
	columns: ColumnDef<TData>[];
	onEdit?: (id?: string) => void;
	onDelete?: (id?: string) => void;
	onCreate?: () => void;

	className?: string;
}

const TypesTable = <TData extends object>({
	data = [],
	columns,
	onEdit,
	onDelete,
	onCreate,
	className,
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

	return (
		<>
			<div
				className={cn(
					"h-full max-h-[calc(100vh-60px)] overflow-auto scrollbar-thin",
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
										className="text-left py-3 px-5 border-r border-gray-300 text-[16px]"
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
								className="border-y border-gray-300"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="text-left p-5 border-r border-gray-300 last-of-type:max-w-10"
									>
										{cell.column.id == "isActive" ? (
											cell.getValue() ? (
												<div className="text-[#24D829]">Работает</div>
											) : (
												<div className="text-[#F63E16]">Не работает</div>
											)
										) : Array.isArray(cell.getValue()) ? (
											//@ts-ignore
											cell.getValue().length > 0 ? (
												//@ts-ignore
												cell
													.getValue()
													//@ts-ignore
													.map((item, index) =>
														typeof item === "object" && item.name ? (
															<div
																className="text-sm font-light"
																key={index}
															>
																{item.name}
															</div>
														) : (
															<div key={index}>{item}</div>
														)
													)
											) : (
												<div>-</div>
											)
										) : typeof cell.getValue() === "object" &&
										  cell.getValue() !== null ? (
											JSON.stringify(cell.getValue())
										) : (
											flexRender(cell.column.columnDef.cell, cell.getContext())
										)}
									</td>
								))}
							</tr>
						))}

						<tr>
							{columns.map((_, index) => (
								<td
									key={index}
									className="flex-1 text-center h-full p-5 border-r border-gray-300"
								></td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			{onCreate && (
				<div className="fixed right-0 cursor-pointer bottom-[74px] w-[48px] h-[48px] mr-5">
					<ButtonCreatePlus onClick={onCreate} />
				</div>
			)}
		</>
	);
};

export default TypesTable;
