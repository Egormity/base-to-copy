import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/inputs/Checkbox";

import { IOrganizationFilter } from "@/services/dictionaries/organizations-filter/organizations-filter.types";

export interface Organization {
	id: string;
	name: string;
	city: string;
	brickAddress: string;
	address: string;
	typeName: string;
	kindName: string;
	categoryName: string;
}

const columnHelper = createColumnHelper<IOrganizationFilter>();

export const defaultColumnsAddOrganization: ColumnDef<
	IOrganizationFilter,
	any
>[] = [
	columnHelper.accessor((row) => row.name, {
		id: "name",
		header: ({ table }) => (
			<div className="px-5 py-2 flex items-center">
				<Checkbox
					onChange={table.getToggleAllRowsSelectedHandler()}
					value={table.getIsAllRowsSelected()}
				/>
				<span className="text-sm font-normal px-3">Название</span>
			</div>
		),
		cell: ({ cell, row }) => (
			<div className="flex  items-center px-5">
				<Checkbox
					onChange={row.getToggleSelectedHandler()}
					value={row.getIsSelected()}
				/>
				<div className="text-sm px-3">{cell.getValue() as string}</div>
			</div>
		),
	}),
	columnHelper.accessor((row) => row.city, {
		id: "city",
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue() as string}</span>
		),
		header: () => (
			<div className="text-sm font-normal text-nowrap px-3">
				Населенный пункт
			</div>
		),
	}),
	columnHelper.accessor((row) => row.brickAddress, {
		id: "brickAddress",
		cell: (info) => (
			<span className="text-sm px-3 text-left">
				{info.getValue() as string}
			</span>
		),
		header: () => <div className="text-sm font-normal px-3">Адрес брика</div>,
	}),
	columnHelper.accessor((row) => row.addressStreet, {
		id: "addressStreet",
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue() as string}</span>
		),
		header: () => <div className="text-sm font-normal px-3">Адрес</div>,
	}),
	columnHelper.accessor((row) => row.institutionTypeName, {
		id: "typeName",
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue() as string}</span>
		),
		header: () => <div className="text-sm font-normal px-3">Тип</div>,
	}),
	columnHelper.accessor((row) => row.institutionKindName, {
		id: "kindName",
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue() as string}</span>
		),
		header: () => <div className="text-sm font-normal px-3">Вид</div>,
	}),
	columnHelper.accessor((row) => row.institutionCategoryName, {
		id: "categoryName",
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue() as string}</span>
		),
		header: () => <div className="text-sm font-normal px-3">Категория</div>,
	}),
];
