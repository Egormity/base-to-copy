import { ReactComponent as DeleteIcon } from "@assets/icons/delete-icon.svg";
import { ReactComponent as EditIcon } from "@assets/icons/edit-icon.svg";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { IProduct } from "@/services/commons";

const columnHelper = createColumnHelper<IProduct>();

export const defaultColumnsProduct: ColumnDef<IProduct, any>[] = [
	columnHelper.accessor("name", {
		header: () => <span className="text-xs">Бренд</span>,
		cell: (info) => (
			<span className="text-sm font-light">{info.getValue() as string}</span>
		),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.classifiers, {
		id: "id",
		cell: (info) => (
			<span className="text-sm font-light">{info.getValue() as string}</span>
		),
		header: () => <span className="text-xs">Препарат</span>,
		footer: (info) => info.column.id,
	}),

	columnHelper.display({
		id: "actions",
		cell: (info) => (
			<div className="flex justify-center space-x-2 w-full px-2">
				<EditIcon
					className="cursor-pointer min-w-[24px]"
					onClick={() =>
						(info.row.original as any).onEdit(info.row.original.id)
					}
				/>
				<DeleteIcon
					className="cursor-pointer min-w-[24px]"
					onClick={() =>
						(info.row.original as any).onDelete(info.row.original.id)
					}
				/>
			</div>
		),
		footer: (info) => info.column.id,
	}),
];
