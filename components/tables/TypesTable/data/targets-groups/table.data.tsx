import { ReactComponent as DeleteIcon } from "@assets/icons/delete-icon.svg";
import { ReactComponent as EditIcon } from "@assets/icons/edit-icon.svg";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { ITargetGroup } from "@/services/commons";

export interface Person {
	id: string;
	name: string;
	targetGroupTypeName: string;
	frequency: number;
}

const columnHelper = createColumnHelper<ITargetGroup>();

export const defaultColumns: ColumnDef<ITargetGroup, any>[] = [
	columnHelper.accessor("name", {
		header: () => (
			<span className="text-xs font-normal">Название целевой группы</span>
		),
		cell: (info) => (
			<span className="text-sm font-light">{info.getValue() as string}</span>
		),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.targetGroupTypeName, {
		id: "targetGroupTypeName",
		cell: (info) => (
			<span className="text-sm font-light">{info.getValue() as string}</span>
		),
		header: () => <span className="text-xs font-normal">Тип группы</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("frequency", {
		header: () => <span className="text-xs font-normal">Частота</span>,
		cell: (info) => (
			<span className="text-sm font-light">{info.renderValue() as number}</span>
		),
		footer: (info) => info.column.id,
	}),
	columnHelper.display({
		id: "actions",
		cell: (info) => (
			<div className="flex justify-center space-x-2">
				<EditIcon
					className="cursor-pointer min-w-[28px]"
					onClick={() =>
						(info.row.original as any).onEdit(info.row.original.id)
					}
				/>
				<DeleteIcon
					className="cursor-pointer min-w-[28px]"
					onClick={() =>
						(info.row.original as any).onDelete(info.row.original.id)
					}
				/>
			</div>
		),
		footer: (info) => info.column.id,
	}),
];
