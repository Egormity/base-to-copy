import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/inputs/Checkbox";

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

export const defaultColumnsAddOrganization: ColumnDef<Organization, any>[] = [
	columnHelper.accessor((row) => row.name, {
		id: "name",
		header: ({ table }) => (
			<div className="px-5 flex flex-row items-center">
				<Checkbox
					onChange={table.getToggleAllRowsSelectedHandler()}
					value={table.getIsAllRowsSelected()}
				/>
				<span className="text-[10px] px-3">Название</span>,
			</div>
		),
		cell: ({ cell, row }) => (
			<div className="flex flex-row items-center px-5">
				<Checkbox
					onChange={row.getToggleSelectedHandler()}
					value={row.getIsSelected()}
				/>
				<span className="text-xs px-3">{cell.getValue() as string}</span>
			</div>
		),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.city, {
		id: "city",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px]">Населенный пункт</span>,
	}),
	columnHelper.accessor((row) => row.brickAddress, {
		id: "brickAddress",
		cell: (info) => (
			<span className="text-xs px-3">{info.getValue() as string}</span>
		),
		header: () => <span className="text-[10px]">Адрес брика</span>,
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
];
