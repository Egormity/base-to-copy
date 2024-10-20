import { ReactComponent as CompanyStructureIcon } from "@assets/icons/structure-company.svg";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";

import { useDoAfterDebounce } from "@/hooks/use-do-after-debounce";

import { useGetCompanyStructures } from "@/api/commons/company-structures/get";
import { useGetCompanyStructureById } from "@/api/commons/company-structures/getById";
import { useGeCompanyParentsByParentId } from "@/api/commons/company-structures/getByParentId";

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

	// MAIN ITEMS
	const { items: mainItems, isLoading: isLoadingMain } =
		useGetCompanyStructures({
			level: 1,
		});

	// SET ON LOAD
	const [isItemNotFound, setIsItemNotFound] = useState(false);
	useEffect(() => {
		if (mainItems?.[0] && (!activeStructureId || isItemNotFound)) {
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
	}, [mainItems, setNodeOnClick, router, isItemNotFound, setIsItemNotFound]);

	// GET ITEM ON CLICK
	const [clickId, setClickId] = useState<string | undefined>();
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
	}, [clickedItem, setNodeOnClick, router]);

	// GET PREVIOUSLY ACTIVE ITEM
	const [fetchItemId, setFetchItemId] = useState<string | undefined | null>(
		activeStructureId
	);
	const [fetchItems, setFetchItems] = useState<ICompanyStructure[]>([]);
	const { item: fetchItem, isLoading: isLoadingFetchItem } =
		useGetCompanyStructureById(fetchItemId || undefined);

	const { doAfterDebounce } = useDoAfterDebounce();
	const { doAfterDebounce: doAfterDebounceFetch } = useDoAfterDebounce();
	const [isSet, setIsSet] = useState(false);

	useEffect(() => {
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
	]);

	// FETCHING CHILDREN
	const [nodeId, setNodeId] = useState<string | undefined>();
	const { item: childrenItems, isLoading: isLoadingChildren } =
		useGeCompanyParentsByParentId(nodeId);

	return isSearch && searchItems ? (
		searchItems.length === 0 ? (
			<p className="p-5 text-xl">Результатов не найдено</p>
		) : (
			<div
				className={`${className} flex flex-col h-full max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin`}
			>
				{searchItems.map((item) => (
					// item.isSearchResult &&
					<div
						key={item.id}
						className="hover:bg-[var(--color-inactive)] cursor-pointer py-4 px-5"
						//@ts-ignore
						onClick={() => setNodeOnClick?.({ ...item, label: item.name })}
					>
						{/* @ts-ignore */}
						<div>{item.name || item.label}</div>
						<div>
							<span className="text-[##A6A6A6]">Сотрудники: </span>
							{item.usersCount}
						</div>
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
				loadItems={
					fetchItems && fetchItems?.length !== 0 ? fetchItems : mainItems
				}
				isLoadingLoadItems={!!fetchItemId}
				//
				icon={undefined}
				firstIcon={IconFirst}
				//
				isToChangeUrl={isToChangeUrl}
			/>
		</div>
	);
}
