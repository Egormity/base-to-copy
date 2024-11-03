import { ReactComponent as CompanyStructureIcon } from "@assets/icons/structure-company.svg";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";

import { useDoAfterDebounce } from "@/hooks/use-do-after-debounce";

import { useGetCompanyStructures } from "@/api/commons/company-structures/get";
import { useGetCompanyStructureById } from "@/api/commons/company-structures/getById";
import { useGeCompanyParentsByParentId } from "@/api/commons/company-structures/getByParentId";

import SearchNotFoundMessage, {
	ISearchNotFoundMessageProps,
} from "../Messages/SearchNotFoundMessage";

import Tree from "./Tree";
import { ICompanyStructure } from "@/services/commons/company-structures/company-structure.types";

interface LibraryFoldersProps {
	className?: string;
	customSearch?: string;
	isSearch?: boolean;
	setNodeOnClick?: React.Dispatch<
		React.SetStateAction<ICompanyStructure | undefined>
	>;
	dontShowItemIds?: Array<string>;
	checkboxSelection?: boolean;
	multiSelect?: boolean;
	treeSelection?: boolean;
	checkedItems?: Array<ICompanyStructure>;
	onCheckedItem?: ({ id }: { id: string }, checked: boolean) => void;
	isToChangeUrl?: boolean;
	onSearchItem?: (item: ICompanyStructure) => void;
	onTreeItem?: (item: ICompanyStructure) => void;
	isToSetMainItemByDefault?: boolean;
	SearchNotFoundMessageProps?: ISearchNotFoundMessageProps;
}

const IconFirst = () => (
	<CompanyStructureIcon className="scale-[1.5] -translate-y-[3px]" />
);

export default function CompanyStructuresTreeView({
	className = "",
	customSearch,
	isSearch,
	setNodeOnClick,
	dontShowItemIds,
	checkboxSelection,
	multiSelect,
	treeSelection,
	checkedItems,
	onCheckedItem,
	isToChangeUrl = true,
	onSearchItem,
	onTreeItem,
	isToSetMainItemByDefault = true,
	SearchNotFoundMessageProps = {},
}: LibraryFoldersProps): JSX.Element {
	// SEARCH ITEMS
	const key = useId();
	const router = useRouter();
	const activeStructureId = router.latestLocation.pathname.split("/")[3];

	// SEARCH ITEMS
	const { items: searchItems } = useGetCompanyStructures({
		searchQuery: customSearch,
		enabled: isSearch,
		key: key,
	});

	const [clickId, setClickId] = useState<string | undefined>();

	// MAIN ITEMS
	const { items: mainItems, isLoading: isLoadingMain } =
		useGetCompanyStructures({
			level: 1,
		});

	// SET ON LOAD
	const [isItemNotFound, setIsItemNotFound] = useState(false);
	useEffect(() => {
		if (
			isToSetMainItemByDefault &&
			mainItems?.[0] &&
			(!activeStructureId || isItemNotFound)
		) {
			//@ts-ignore
			setNodeOnClick?.({ ...mainItems[0], label: mainItems[0]?.name });
			setIsItemNotFound(false);
			isToChangeUrl &&
				router
					.navigate({
						to: `/structures/structure/${mainItems[0].id}`.toString(),
					})
					.catch((error) => console.log(error));
		} // activeStructureId dependency BREAKS IT
	}, [
		isToSetMainItemByDefault,
		isToChangeUrl,
		mainItems,
		setNodeOnClick,
		router,
		isItemNotFound,
		setIsItemNotFound,
	]);

	// GET ITEM ON CLICK
	const { item: clickedItem } = useGetCompanyStructureById(clickId);

	// SET ITEM ON CLICK
	useEffect(() => {
		if (clickedItem?.[0]) {
			//@ts-ignore
			setNodeOnClick?.({ ...clickedItem[0], label: clickedItem[0].name });
			isToChangeUrl &&
				router
					.navigate({
						to: `/structures/structure/${clickedItem[0].id}`.toString(),
					})
					.catch((error) => console.log(error));
		}
	}, [clickedItem, setNodeOnClick, router, isToChangeUrl]);

	// GET PREVIOUSLY ACTIVE ITEM
	const [fetchItemId, setFetchItemId] = useState<string | undefined | null>(
		activeStructureId || "wait"
	);
	const [fetchItems, setFetchItems] = useState<ICompanyStructure[]>([]);
	const { item: fetchItem, isLoading: isLoadingFetchItem } =
		useGetCompanyStructureById(
			fetchItemId || undefined,
			!!fetchItemId &&
				fetchItemId !== "wait" &&
				(mainItems?.[0] && fetchItemId === mainItems?.[0]?.id ? false : true)
		);

	const { doAfterDebounce } = useDoAfterDebounce();
	const { doAfterDebounce: doAfterDebounceFetch } = useDoAfterDebounce();
	const { doAfterDebounce: doAfterDebounceLostChild } =
		useDoAfterDebounce(3000);

	const [isSet, setIsSet] = useState(false);

	useEffect(() => {
		doAfterDebounceLostChild(!!fetchItemId, () => {
			setFetchItemId(null);
			setClickId(fetchItems?.at(-1)?.id || mainItems?.[0]?.id);
			// toast.error("Не найден родитель выбранного элемента!");
		});

		doAfterDebounceFetch(
			!isLoadingFetchItem && (fetchItem?.length === 0 || !fetchItem?.[0]),
			() => {
				setFetchItemId(null);
				setIsItemNotFound(true);
			}
		);

		doAfterDebounce(
			!isSet && !isLoadingFetchItem && !!activeStructureId && !isToChangeUrl,
			() => {
				const thisId = fetchItems?.filter(
					(item) => item.id === activeStructureId
				)?.[0]?.id;

				const thisParentId = fetchItems?.filter(
					(item) => item.id === activeStructureId
				)?.[0]?.parentId;

				setClickId(
					// @ts-ignore
					(dontShowItemIds?.includes(thisId) ? "" : thisId) ||
						// @ts-ignore
						(dontShowItemIds?.includes(thisParentId) ? "" : thisParentId) ||
						undefined
				);
				setIsSet(true);
			}
		);

		if (
			fetchItem?.[0] &&
			!fetchItems.some((el) => el.id === fetchItem?.[0]?.id)
		) {
			if (!fetchItem[0].parentId && fetchItems.length > 0)
				setClickId(fetchItems.at(-1)?.id);

			setFetchItemId(fetchItem[0].parentId);
			setFetchItems((s) => (fetchItem[0] ? [fetchItem[0], ...s] : s));
		}
	}, [
		fetchItemId,
		setFetchItemId,
		fetchItem,
		setFetchItems,
		fetchItems,
		isLoadingFetchItem,
		doAfterDebounce,
		activeStructureId,
		isToChangeUrl,
		dontShowItemIds,
		isSet,
		setIsSet,
		doAfterDebounceFetch,
	]);

	// FETCHING CHILDREN
	const [nodeId, setNodeId] = useState<string | undefined>();
	const { item: childrenItems, isLoading: isLoadingChildren } =
		useGeCompanyParentsByParentId(nodeId);

	const filteredSearchItems = searchItems?.filter(
		(item) => !dontShowItemIds?.includes(item.id)
	);

	return isSearch && filteredSearchItems ? (
		filteredSearchItems.length === 0 ? (
			<SearchNotFoundMessage {...SearchNotFoundMessageProps} />
		) : (
			<div
				className={`${className} flex flex-col h-full max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin`}
			>
				{filteredSearchItems.map((item) => (
					// item.isSearchResult &&
					<div
						key={item.id}
						className={`${clickId === item.id ? "bg-[var(--color-inactive)]" : ""} text-left hover:bg-[var(--color-inactive)] cursor-pointer py-4 px-5`}
						onClick={() => {
							if (isToChangeUrl) {
								setFetchItems([]);
								setFetchItemId(item.id);
								setIsSet(false);
								setIsItemNotFound(false);
								setFetchItem(undefined);
								onSearchItem?.(item);
							}
							setClickId(item.id);
						}}
					>
						{/* @ts-ignore */}
						<p>{item.name || item.label}</p>
						<p>
							<span className="text-[##A6A6A6]">Сотрудники: </span>
							{item.usersCount}
						</p>
					</div>
				))}
			</div>
		)
	) : (
		<div
			className={`${className} relative flex p-5 h-full max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin`}
		>
			<Tree
				dontShowItemIds={dontShowItemIds}
				//
				checkboxSelection={checkboxSelection}
				multiSelect={multiSelect}
				treeSelection={treeSelection}
				checkedItems={checkedItems}
				onCheckedItem={onCheckedItem}
				//
				clickId={clickId}
				onClickId={setClickId}
				//
				nodeId={nodeId}
				onNodeId={setNodeId}
				//
				mainItems={mainItems}
				isLoadingMain={isLoadingMain}
				//
				childrenItems={childrenItems}
				isLoadingChildren={isLoadingChildren}
				//
				loadItems={[...(mainItems || []), ...fetchItems].filter(
					(item, i, arr) => !arr.slice(i + 1).some((el) => el.id === item.id)
				)}
				isLoadingLoadItems={!!fetchItemId}
				//
				icon={undefined}
				firstIcon={IconFirst}
				//
				isToChangeUrl={isToChangeUrl}
				//
				// @ts-ignore
				onItemClick={onTreeItem}
			/>
		</div>
	);
}
