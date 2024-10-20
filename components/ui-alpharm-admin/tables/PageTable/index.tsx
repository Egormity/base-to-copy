import { Skeleton } from "@mui/material";
import {
	ColumnDef,
	RowSelectionState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import { useMemo } from "react";

import { useGetMorePages } from "@/hooks/use-get-more-page";

import { ButtonCreateText } from "../../buttons/ButtonCreateText";

import styles from "./PageTable.module.scss";

interface TypesTableProps<TData> {
	data?: TData[];
	isHover?: boolean;
	columns: ColumnDef<TData>[];

	className?: string;
	borderSquare?: boolean;
	borderLeft?: boolean;
	additionalRow?: boolean;
	isBorderBottom?: boolean;
	isScrollHeader?: boolean;

	setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
	rowSelection?: RowSelectionState;

	onClickOnRow?: (id?: string) => void;
	onEdit?: (id?: string) => void;
	onDelete?: (id?: string) => void;
	onAdd?: () => void;

	aboveTableContent?: React.ReactNode;

	fetchNextPage?: () => void;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;

	stylesForFirstCells?: {
		length: number;
		columnIndex: number;
		style: string;
	};
}

const PageTable = <TData extends { id?: string }>({
	data = [],
	onClickOnRow,
	columns,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	onEdit,
	onDelete,
	onAdd,
	className,
	setRowSelection,
	rowSelection,
	additionalRow = true,
	borderSquare = false,
	borderLeft = false,
	isBorderBottom = false,
	isHover = true,
	isScrollHeader = true,
	aboveTableContent,
	stylesForFirstCells,
}: TypesTableProps<TData>) => {
	const memoizedData = useMemo(
		() =>
			data?.map((item) => ({
				...item,

				onEdit,
				onDelete,
			})),
		[data, onEdit, onDelete]
	);

	const handleAddClick = () => onAdd && onAdd();
	const table = useReactTable({
		columns,
		data: memoizedData,
		state: { rowSelection },
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row, index) => row.id || index.toString(),
	});

	const { loadMoreRef } = useGetMorePages({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	});

	return (
		<div
			className={cn(styles["pageTableContainer"], className, {
				[styles["scrollHeaderContainer"] as string]: isScrollHeader,
			})}
		>
			{aboveTableContent && aboveTableContent}
			<table className={styles["table"]}>
				<thead
					className={cn({
						[styles["scrollHeaderThead"] as string]: isScrollHeader,
					})}
				>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							key={headerGroup.id}
							className={cn(styles["theadRow"], {
								[styles["scrollHeaderTheadRow"] as string]: isScrollHeader,
							})}
						>
							{headerGroup.headers.map((header, index) => (
								<th
									key={header.id}
									className={cn(
										styles["theadCell"],
										index === 0 && styles["theadCellFirst"],
										{
											"border-l border-primary-gray-light": borderLeft,
											[styles["scrollHeaderTheadCell"] as string]:
												isScrollHeader,
										}
									)}
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
				<tbody
					className={cn({
						[styles["scrollHeaderTbody"] as string]: isScrollHeader,
					})}
				>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							onClick={() => onClickOnRow && onClickOnRow(row.original.id)}
							className={cn(
								styles["tbodyRow"],

								{
									[styles["scrollHeaderTbodyRow"] as string]: isScrollHeader,

									"hover:bg-[var(--color-inactive)] cursor-pointer": isHover,

									"border-b": isBorderBottom,
								}
							)}
						>
							{row.getVisibleCells().map((cell, index) => (
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

										styles["tbodyCell"],

										index === 0 && styles["tbodyCellFirst"],
										{
											"py-3": !borderSquare,

											"border-l border-primary-gray-light ": borderLeft,
											[styles["scrollHeaderTbodyCell"] as string]:
												isScrollHeader,
										}
									)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
					{hasNextPage && (
						<tr>
							<td colSpan={columns.length}>
								<div
									ref={loadMoreRef}
									style={{ height: "1px" }}
								/>
							</td>
						</tr>
					)}
					{additionalRow && (
						<tr>
							{columns.map((_, index) => (
								<td
									key={index}
									className={cn(styles["additionalRowCell"], {
										"border-l border-b border-primary-gray-light": borderLeft,
										[styles["scrollHeaderAdditionalRowCell"] as string]:
											isScrollHeader,
									})}
								>
									{index === 0 && onAdd && (
										<div className="flex justify-start h-full px-5 py-3">
											<ButtonCreateText
												btnType="transparent"
												text="Добавить"
												onClick={handleAddClick}
											/>
										</div>
									)}
								</td>
							))}
						</tr>
					)}
					{isFetchingNextPage && (
						<tr>
							<td colSpan={columns.length}>
								<Skeleton className="w-full" />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default PageTable;
