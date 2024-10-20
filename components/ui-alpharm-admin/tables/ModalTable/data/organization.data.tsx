// src/components/ui/tables/ModalTable/data/organization.data.ts
import { ReactComponent as DeleteIcon } from "@assets/icons/delete-icon.svg";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { IOrganizationFilter } from "@/services/dictionaries/organizations-filter/organizations-filter.types";

const columnHelper = createColumnHelper<IOrganizationFilter>();

// Modify the export to be a function that accepts onDelete
export const getDefaultColumnsOrganization = (
	onDelete: (row: IOrganizationFilter) => void
): ColumnDef<IOrganizationFilter, any>[] => [
	columnHelper.accessor("name", {
		header: () => <span className="text-sm font-normal px-3">Название</span>,
		cell: (info) => (
			<div className="text-sm px-3">{info.getValue<string>()}</div>
		),
	}),
	columnHelper.accessor("city", {
		header: () => (
			<span className="text-sm font-normal px-3">Населенный пункт</span>
		),
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue<string>()}</span>
		),
	}),
	columnHelper.accessor("brickAddress", {
		header: () => <span className="text-sm font-normal px-3">Адрес брика</span>,
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue<string>()}</span>
		),
	}),
	columnHelper.accessor("addressStreet", {
		header: () => <span className="text-sm font-normal px-3">Адрес</span>,
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue<string>()}</span>
		),
	}),
	columnHelper.accessor("institutionTypeName", {
		header: () => <span className="text-sm font-normal px-3">Тип</span>,
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue<string>()}</span>
		),
	}),
	columnHelper.accessor("institutionKindName", {
		header: () => <span className="text-sm font-normal px-3">Вид</span>,
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue<string>()}</span>
		),
	}),
	columnHelper.accessor("institutionCategoryName", {
		header: () => <span className="text-sm font-normal px-3">Категория</span>,
		cell: (info) => (
			<span className="text-sm px-3">{info.getValue<string>()}</span>
		),
	}),

	// Actions Column
	columnHelper.display({
		id: "actions",
		cell: (info) => (
			<div className="space-x-2 px-4 flex items-center justify-center">
				<DeleteIcon
					className="cursor-pointer"
					onClick={() => onDelete(info.row.original)}
				/>
			</div>
		),
	}),
];
