import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { ReactComponent as IconFolder } from "@/assets/icons/folder.svg";

import { useDoAfterDebounce } from "@/hooks/use-do-after-debounce";

import {
	useGeLibraryFoldersByParentId,
	useGetLibraryFolders,
} from "@/api/commons/library-folders";
import { useGetLibraryFoldersById } from "@/api/commons/library-folders/getById";

import SearchNotFoundMessage from "../Messages/SearchNotFoundMessage";

import Tree from "./Tree";
import type { ILibraryFolder } from "@/services/commons";

interface LibraryFoldersProps {
	className?: string;
	customSearch?: string;
	folderTypeId: number;
	setNodeOnClick?: React.Dispatch<
		React.SetStateAction<ILibraryFolder | undefined>
	>;
	dontShowItemIds?: Array<string>;
	checkboxSelection?: boolean;
	multiSelect?: boolean;
	treeSelection?: boolean;
	checkedItems?: Array<ILibraryFolder>;
	onCheckedItem?: ({ id }: { id: string }, checked: boolean) => void;
	icon?: boolean;
	onItemClick?: () => void;
	isToChangeUrl?: boolean;
	folderToGoUp?: ILibraryFolder;
}

export default function LibraryTreeView({
	className = "",
	customSearch,
	folderTypeId,
	setNodeOnClick,
	dontShowItemIds,
	checkboxSelection,
	multiSelect,
	treeSelection,
	checkedItems,
	onCheckedItem,
	icon = true,
	onItemClick,
	isToChangeUrl = true,
	folderToGoUp,
}: LibraryFoldersProps): JSX.Element {
	const router = useRouter();

	let type: "materials" | "polls";
	if (folderTypeId === 1) type = "materials";
	if (folderTypeId === 2) type = "polls";

	const activeFolderId = router.latestLocation.pathname.split("/")[4];

	const extraRouting = useRef<string>(
		router.latestLocation.pathname.split("/").slice(5).join("/")
	);
	const [isFirstNavigation, setIsFirstNavigation] = useState(true);

	const { doAfterDebounce } = useDoAfterDebounce(
		isFirstNavigation ? 0 : undefined
	);

	// SEARCH ITEMS
	const { items: searchItems } = useGetLibraryFolders({
		searchQuery: customSearch,
		folderTypeId: folderTypeId,
		enabled: !!customSearch,
	});

	// MAIN ITEMS
	const { items: mainItems, isLoading: isLoadingMain } = useGetLibraryFolders({
		folderTypeId: folderTypeId,
		level: 1,
	});

	// SET ON LOAD
	const [isItemNotFound, setIsItemNotFound] = useState(false);
	useEffect(() => {
		if (mainItems?.[0] && (!activeFolderId || isItemNotFound)) {
			setNodeOnClick?.(mainItems[0]);
			setIsItemNotFound(false);
			doAfterDebounce(true, () => {
				isToChangeUrl &&
					mainItems?.[0] &&
					router
						.navigate({
							to: `/library/${type}/folder/${mainItems[0].id}${isFirstNavigation && extraRouting?.current ? `/${extraRouting.current}` : ""}`.toString(),
						})
						.catch((error) => console.log(error));
			});
		}
	}, [
		// activeFolderId dependency BREAKS IT
		//@ts-ignore
		type,
		mainItems,
		setNodeOnClick,
		router,
		isItemNotFound,
		setIsItemNotFound,
		onItemClick,
		isFirstNavigation,
		isToChangeUrl,
		doAfterDebounce,
	]);

	// GET ITEM ON CLICK
	const [clickId, setClickId] = useState<string | undefined>();
	const { items: clickedItem } = useGetLibraryFoldersById({
		folderTypeId: folderTypeId,
		id: clickId,
	});

	// SET ITEM ON CLICK
	useEffect(() => {
		if (clickedItem?.[0]) {
			doAfterDebounce(!!clickedItem[0], () => {
				isToChangeUrl &&
					clickedItem?.[0] &&
					router
						.navigate({
							to: `/library/${type}/folder/${clickedItem[0].id}${isFirstNavigation && extraRouting?.current ? `/${extraRouting.current}` : ""}`.toString(),
						})
						.catch((error) => console.log(error));
			});

			setNodeOnClick?.(clickedItem[0]);
		}
	}, [
		clickedItem,
		setNodeOnClick,
		router,
		setIsFirstNavigation,
		isFirstNavigation,
		isToChangeUrl,
		activeFolderId,
		doAfterDebounce,
		//@ts-ignore
		type,
	]);

	// GET PREVIOUSLY ACTIVE ITEM
	const [fetchItemId, setFetchItemId] = useState<string | undefined | null>(
		activeFolderId || "wait"
	);
	const [fetchItems, setFetchItems] = useState<ILibraryFolder[]>([]);
	const { items: fetchItem, isLoading: isLoadingFetchItem } =
		useGetLibraryFoldersById({
			folderTypeId: folderTypeId,
			id: fetchItemId,
			enabled:
				!!fetchItemId &&
				fetchItemId !== "wait" &&
				(mainItems?.[0] && fetchItemId === mainItems?.[0]?.id ? false : true),
		});

	const { doAfterDebounce: doAfterDebounceLostChild } =
		useDoAfterDebounce(3000);

	const [isSet, setIsSet] = useState(false);

	useEffect(() => {
		doAfterDebounceLostChild(!!fetchItemId, () => {
			setFetchItemId(null);
			setClickId(fetchItems?.at(-1)?.id || mainItems?.[0]?.id);
			// toast.error("Не найден родитель выбранного элемента!");
		});

		doAfterDebounce(
			!isSet && !isLoadingFetchItem && !!activeFolderId && !isToChangeUrl,
			() => {
				const thisId = fetchItems?.filter(
					(item) => item.id === activeFolderId
				)?.[0]?.id;

				const thisParentId = fetchItems?.filter(
					(item) => item.id === activeFolderId
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
		activeFolderId,
		isToChangeUrl,
		dontShowItemIds,
		isSet,
		setIsSet,
	]);

	// FETCHING CHILDREN
	const [nodeId, setNodeId] = useState<string | undefined>();
	const { item: childrenItems, isLoading: isLoadingChildren } =
		useGeLibraryFoldersByParentId({
			parentId: nodeId,
			folderTypeId: folderTypeId,
		});

	const filteredSearchItems = searchItems?.filter(
		(item) => !dontShowItemIds?.includes(item.id)
	);

	return customSearch && filteredSearchItems ? (
		<div
			className={`${className} flex flex-col h-full min-h-[300px] max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin`}
		>
			{filteredSearchItems.length === 0 ? (
				<SearchNotFoundMessage />
			) : (
				filteredSearchItems.map(
					(item) =>
						item.isSearchResult && (
							<div
								key={item.id}
								className="hover:bg-[var(--color-inactive)] cursor-pointer p-5 text-left"
							>
								{item.name}
							</div>
						)
				)
			)}
		</div>
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
				icon={icon && <IconFolder className="relative mr-2" />}
				//
				itemToGoUp={folderToGoUp}
				//
				onItemClick={() => {
					onItemClick?.();
					setIsFirstNavigation(false);
				}}
				//
				isToChangeUrl={isToChangeUrl}
			/>
		</div>
	);
}
