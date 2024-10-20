import { useEffect, useState } from "react";

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
}: LibraryFoldersProps): JSX.Element {
	// SEARCH ITEMS
	const { items: searchItems } = useGetBricks({
		searchQuery: customSearch,
		enabled: !!customSearch,
	});

	// MAIN ITEMS
	const { items: mainItems, isLoading: isLoadingMain } = useGetBricksFirstLevel(
		{}
	);

	// SET ON LOAD
	useEffect(() => {
		if (mainItems?.[0]) setNodeOnClick?.(mainItems[0]);
	}, [mainItems, setNodeOnClick]);

	// GET FOLDER ON CLICK
	const [clickId, setClickId] = useState<string | undefined>();
	const { item: clickedItem } = useGeBricksByParentId(clickId);

	// SET FOLDER ON CLICK
	useEffect(() => {
		if (clickedItem?.[0] && setNodeOnClick) setNodeOnClick(clickedItem[0]);
	}, [clickedItem, setNodeOnClick]);

	// FETCHING CHILDREN
	const [nodeId, setNodeId] = useState<string | undefined>();

	const { item: childrenItems, isLoading: isLoadingChildren } =
		useGeBricksByParentId(nodeId);

	return customSearch && searchItems ? (
		searchItems.length === 0 ? (
			<SearchNotFoundMessage
				isTextCenter
				isPaddingTop
			/>
		) : (
			<div
				className={`${className} flex flex-col h-full max-h-[calc(100vh-70px)] overflow-auto scrollbar-thin`}
			>
				{searchItems.map((item) => (
					// item.isSearchResult &&
					<div
						key={item.id}
						className="hover:bg-[var(--color-inactive)] cursor-pointer p-5 text-left"
					>
						<p>{item.name}</p>
						<p className="text-xs text-primary-gray-dark">{item.fullPath}</p>
					</div>
				))}
			</div>
		)
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
				icon={undefined}
				//
				itemsState={itemsState}
				//@ts-ignore
				setItemsState={setItemsState}
			/>
		</div>
	);
}
