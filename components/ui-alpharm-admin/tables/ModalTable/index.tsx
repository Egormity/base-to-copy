import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import { useMemo } from "react";

interface TypesTableProps<T extends object> {
	data: T[];
	columns: ColumnDef<T, any>[];
	onEdit?: () => void;
	onDelete?: () => void;
	onCreate?: () => void;
	className?: string;
}

const ModalTable = <T extends object>({
	data,
	columns,
	onEdit,
	onDelete,
	className,
}: TypesTableProps<T>) => {
	const memoizedData = useMemo(
		() => data.map((item) => ({ ...item, onEdit, onDelete })),
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
					"overflow-auto overflow-y-auto scrollbar-thin border-primary-gray-light border-[1px] rounded-lg",
					className
				)}
			>
				<table className="w-full l border-collapse">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr
								key={headerGroup.id}
								className=" border-b border-primary-gray-light"
							>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="text-center first-of-type:text-left first-of-type:px-3 py-[18px] border-r border-primary-gray-light text-[16px] "
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
								className="text-xs"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="text-center first-of-type:text-left py-3 first-of-type:px-3 px-1 min-w-[80px] last-of-type:!min-w-[70px] border-r border-primary-gray-light"
									>
										{cell.getValue() === "" ? (
											<div className="text-left">-</div>
										) : Array.isArray(cell.getValue()) ? (
											<div>
												{(cell.getValue() as string[]).map((text, index) => (
													<p
														className="text-left"
														key={index}
													>
														{text}
													</p>
												))}
											</div>
										) : (
											flexRender(cell.column.columnDef.cell, cell.getContext())
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ModalTable;
