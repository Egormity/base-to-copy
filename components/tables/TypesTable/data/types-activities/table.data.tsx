import { ReactComponent as DeleteIcon } from "@assets/icons/delete-icon.svg";
import { ReactComponent as EditIcon } from "@assets/icons/edit-icon.svg";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { IActivityType } from "@/services/commons";

const columnHelper = createColumnHelper<IActivityType>();

export const defaultColumnsActivities: ColumnDef<IActivityType, any>[] = [
	columnHelper.accessor("name", {
		header: () => "Название",
		cell: (info) => info.getValue() as string,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.masterActivityGroupName, {
		id: "masterActivityGroupName",
		cell: (info) => <i>{info.getValue() as string}</i>,
		header: () => "Категория активности",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("equivalent", {
		header: () => "Эквивалент в визитах",
		cell: (info) => info.renderValue() as number,
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
