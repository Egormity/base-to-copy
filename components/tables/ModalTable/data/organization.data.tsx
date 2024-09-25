import { ReactComponent as DeleteIcon } from "@assets/icons/delete-icon.svg";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export interface Organization {
	name: string;
	city: string;
	brickAddress: string;
	address: string;
	typeName: string;
	kindName: string;
	categoryName: string;
}

const columnHelper = createColumnHelper<Organization>();

export const defaultColumnsOrganization: ColumnDef<Organization, any>[] = [
	columnHelper.accessor((row) => row.name, {
		id: "name",
		header: () => <span className="text-[10px] px-3">Название</span>,
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
	}),
	columnHelper.accessor((row) => row.city, {
		id: "city",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px] px-3">Населенный пункт</span>,
	}),
	columnHelper.accessor((row) => row.brickAddress, {
		id: "brickAddress",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px] px-3">Адрес брика</span>,
	}),
	columnHelper.accessor((row) => row.address, {
		id: "address",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px] px-3">Адрес</span>,
	}),
	columnHelper.accessor((row) => row.typeName, {
		id: "typeName",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px] px-3">Тип</span>,
	}),
	columnHelper.accessor((row) => row.kindName, {
		id: "kindName",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px] px-3">Вид</span>,
	}),
	columnHelper.accessor((row) => row.categoryName, {
		id: "categoryName",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px] px-3">Категория</span>,
	}),

	columnHelper.display({
		id: "actions",

		cell: (info) => (
			<div className="space-x-2  px-4 flex items-center justify-center">
				<DeleteIcon
					className="cursor-pointer"
					onClick={() => (info.row.original as any).onDelete(info.row.original)}
				/>
			</div>
		),
		footer: (info) => info.column.id,
	}),
];
