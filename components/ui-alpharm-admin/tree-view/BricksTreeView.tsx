import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDoAfterDebounce } from "@/hooks/use-do-after-debounce";

import { useGeBricksByParentId, useGetBricks } from "@/api/commons";
import { useGetBricksFirstLevel } from "@/api/commons/bricks/getByFirstLevel";

import SearchNotFoundMessage from "../Messages/SearchNotFoundMessage";

import Tree from "./Tree";
import type { IBrick } from "@/services/commons";

interface LibraryFoldersProps {
	className?: string;
	customSearch?: string;
	setNodeOnClick?: React.Dispatch<React.SetStateAction<IBrick | undefined>>;
	dontShowItemIds?: Array<string>;
	checkboxSelection?: boolean;
	multiSelect?: boolean;
	treeSelection?: boolean;
	checkedItems?: Array<{ id: string }>;
	onCheckedItem?: (item: IBrick, checked: boolean) => void;
	itemsState?: Array<IBrick>;
	setItemsState?: React.Dispatch<React.SetStateAction<Array<IBrick>>>;
	isSearch?: boolean;
	isToSetMainItemByDefault?: boolean;
	isToChangeUrl?: boolean;
	onSearchItem?: (item: IBrick) => void;
}

export default function BricksTreeView({
	className = "",
	customSearch,
	setNodeOnClick,
	dontShowItemIds,
	checkboxSelection,
	multiSelect,
	treeSelection,
	checkedItems,
	onCheckedItem,
	itemsState,
	setItemsState,
	isSearch,
	isToSetMainItemByDefault,
	isToChangeUrl = true,
	onSearchItem,
}: LibraryFoldersProps): JSX.Element {
	// SEARCH ITEMS
	// const key = useId();
	const router = useRouter();
	const activeStructureId = router.latestLocation.pathname.split("/")[4];

	// SEARCH ITEMS
	const { items: searchItems } = useGetBricks({
		searchQuery: customSearch,
		enabled: !!isSearch,
		// key: key,
	});

	// MAIN ITEMS
	const { items: mainItems, isLoading: isLoadingMain } = useGetBricksFirstLevel(
		{}
	);

	// SET ON LOAD
	const [isItemNotFound, setIsItemNotFound] = useState(false);
	useEffect(() => {
		if (
			isToSetMainItemByDefault &&
			mainItems?.[0] &&
			(!activeStructureId || isItemNotFound)
		) {
			setNodeOnClick?.(mainItems[0]);
			setIsItemNotFound(false);
			isToChangeUrl &&
				router
					.navigate({
						to: `/manual/bricks/brick/${mainItems[0].id}`.toString(),
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
	const [clickId, setClickId] = useState<string | undefined>();
	const { items: clickedItem } = useGetBricks({ id: clickId });

	// SET ITEM ON CLICK
	useEffect(() => {
		if (clickedItem?.[0]) {
			setNodeOnClick?.(clickedItem[0]);
			isToChangeUrl &&
				router
					.navigate({
						to: `/manual/bricks/brick/${clickedItem[0].id}`.toString(),
					})
					.catch((error) => console.log(error));
		}
	}, [clickedItem, setNodeOnClick, router, isToChangeUrl]);

	// GET PREVIOUSLY ACTIVE ITEM
	const [fetchItemId, setFetchItemId] = useState<string | undefined | null>(
		activeStructureId
	);
	const [fetchItems, setFetchItems] = useState<IBrick[]>([]);
	const {
		items: fetchItem,
		isLoading: isLoadingFetchItem,
		setItems: setFetchItem,
	} = useGetBricks({
		id: fetchItemId || undefined,
		enabled: !!fetchItemId,
	});

	const { doAfterDebounce } = useDoAfterDebounce();
	const { doAfterDebounce: doAfterDebounceFetch } = useDoAfterDebounce();
	const { doAfterDebounce: doAfterDebounceLostChild } =
		useDoAfterDebounce(3000);

	const [isSet, setIsSet] = useState(false);

	useEffect(() => {
		doAfterDebounceLostChild(!!fetchItemId, () => {
			setFetchItemId(null);
			setClickId(fetchItems?.at(-1)?.id || mainItems?.[0]?.id);
			toast.error("Не найден родитель выбранного элемента!");
		});

		doAfterDebounceFetch(
			!isLoadingFetchItem &&
				(fetchItem?.length === 0 ||
					!fetchItem?.[0] ||
					fetchItem?.[0]?.id === mainItems?.[0]?.id),
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
		doAfterDebounceFetch,
		mainItems,
	]);

	// FETCHING CHILDREN
	const [nodeId, setNodeId] = useState<string | undefined>();
	const { item: childrenItems, isLoading: isLoadingChildren } =
		useGeBricksByParentId(nodeId);

	if (customSearch && searchItems && searchItems.length === 0) {
		return <SearchNotFoundMessage />;
	}

	return (
		<>
			{customSearch && searchItems ? (
				<div
					className={`${className} flex flex-col h-full max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin`}
				>
					{searchItems?.map(
						(item) =>
							item.isSearchResult && (
								<div
									key={item.id}
									className="hover:bg-[var(--color-inactive)] cursor-pointer p-5 text-left"
									onClick={() => {
										setFetchItems([]);
										setFetchItemId(item.id);
										setIsSet(false);
										setIsItemNotFound(false);
										setClickId(item.id);
										setFetchItem(undefined);
										onSearchItem?.(item);
									}}
								>
									<p>{item.name}</p>
									<p className="text-xs text-primary-gray-dark">
										{item.fullPath}
									</p>
								</div>
							)
					)}
				</div>
			) : (
				<div
					className={`${className} flex p-5 h-full max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin`}
				>
					<Tree
						dontShowItemIds={dontShowItemIds}
						//
						checkboxSelection={checkboxSelection}
						multiSelect={multiSelect}
						treeSelection={treeSelection}
						//@ts-ignore
						checkedItems={checkedItems}
						//@ts-ignore
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
						//
						itemsState={itemsState}
						//@ts-ignore
						setItemsState={setItemsState}
					/>
				</div>
			)}
		</>
	);
}
