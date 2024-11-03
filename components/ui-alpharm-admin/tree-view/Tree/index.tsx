import { Skeleton } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import React, {
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

import Loader from "@/components/ui/common/loader";
import { Checkbox } from "@/components/ui/inputs/Checkbox";
import StyledTreeItem from "@/components/ui/tree-view/Tree/StyledTreeItem";

import { ReactComponent as CollapsedIcon } from "@/assets/icons/dropdown-icon.svg";
import { ReactComponent as ExpandIcon } from "@/assets/icons/expand-icon.svg";

import { useRevalidateTree } from "@/hooks/use-revalidate-tree";

import { handleAddItems, handleChangeItem } from "./utils";

export type ITreeNode = {
	id: string;
	name: string;
	parentId: string | null;
	isSearchResult?: boolean;
	fullPath?: string;
	hasChildren?: boolean;
	level?: number;

	// LIBRARY
	folderTypeId?: number;

	// COMPANY STRUCTURES
	usersCount?: number;
	chiefId?: string | null;

	// DEVELOP
	children?: Array<ITreeNode>;
	updateIndex?: number;
};

interface ITreeViewProps {
	dontShowItemIds?: Array<string>;

	checkboxSelection?: boolean;
	multiSelect?: boolean;
	treeSelection?: boolean;
	checkedItems?: Array<ITreeNode>;
	onCheckedItem?: (item: ITreeNode, checked: boolean) => void;

	clickId: string | undefined;
	onClickId: React.Dispatch<React.SetStateAction<string | undefined>>;

	nodeId: string | undefined;
	onNodeId: React.Dispatch<React.SetStateAction<string | undefined>>;

	mainItems: Array<ITreeNode> | undefined;
	isLoadingMain: boolean;

	childrenItems: Array<ITreeNode> | undefined;
	isLoadingChildren: boolean;

	loadItems?: Array<ITreeNode> | undefined;
	isLoadingLoadItems?: boolean;

	icon?: React.ReactNode;
	firstIcon?: () => JSX.Element;

	setItemsState?: React.Dispatch<React.SetStateAction<Array<ITreeNode>>>;

	itemToGoUp?: ITreeNode;

	onItemClick?: (item: ITreeNode) => void;

	isToChangeUrl?: boolean;
}

const TreeView: FC<ITreeViewProps> = ({
	dontShowItemIds,

	checkboxSelection = false,
	treeSelection,
	checkedItems,
	onCheckedItem,

	clickId,
	onClickId,

	nodeId,
	onNodeId,

	mainItems,
	isLoadingMain,

	childrenItems,
	isLoadingChildren,

	loadItems,
	isLoadingLoadItems,

	icon,
	firstIcon,

	setItemsState,

	itemToGoUp,

	onItemClick,

	isToChangeUrl,
}) => {
	// SET TREE DATA
	const [treeData, setTreeData] = useState<Array<ITreeNode> | undefined>([]);

	useEffect(() => {
		if (treeData && treeData.length <= 0 && mainItems && mainItems.length > 0) {
			setTreeData(mainItems);
		}
	}, [mainItems, treeData, setTreeData]);

	// REF
	const apiRef = useTreeViewApiRef();

	// HANDLE OPENED NODES
	const [openedIds, setOpenedIds] = useState<Array<string>>([]);
	const [expandedItems, setExpandedItems] = useState<Array<string>>([]);
	useEffect(() => {
		setOpenedIds(expandedItems);
	}, [expandedItems]);

	const [openedLoadIds, setOpenedLoadIds] = useState<Array<string>>([]);

	// HANDLE ITEM CLICK
	const handleItemSelectionToggle = useCallback(
		(
			_: React.SyntheticEvent | null | false,
			id: string,
			isClicked: boolean = true,
			isLoadItem: boolean = false
		) => {
			if (id) {
				onNodeId(id);

				if (isClicked) {
					onClickId(id);
				}

				if (isLoadItem) {
					setOpenedLoadIds((s) => [...s, id]);
				}

				if (isLoadItem && openedLoadIds.length + 1 === loadItems?.length) {
					onClickId(id);
					setOpenedIds(loadItems.map((item) => item.id));
				}

				setOpenedIds((s) =>
					s.includes(id) ? s.filter((item) => item !== id) : [...s, id]
				);
			}
		},
		[
			onClickId,
			setOpenedLoadIds,
			setOpenedIds,
			openedLoadIds,
			loadItems,
			onNodeId,
		]
	);

	// TREE UPDATING
	const { revalidate, deleted } = useRevalidateTree();

	// SET CLICK ID WHEN ITEM DELETED
	useEffect(() => {
		if (deleted.length > 0 && clickId === deleted.at(-1)?.id) {
			const newId = deleted.at(-1)?.parentId || undefined;
			onNodeId(newId);
			onClickId(newId);
		}
	}, [deleted, onClickId, clickId, onNodeId]);

	// REVALIDATE TREE WHEN ITEM CHANGED
	useEffect(() => {
		const revalidateNode = revalidate.at(-1);
		if (!isToChangeUrl || !mainItems?.[0] || !revalidateNode) return;

		if (!revalidateNode.newItem.parentId) {
			// @ts-ignore
			setTreeData((state) =>
				state ? [{ ...state[0], name: revalidateNode.newItem.name }] : state
			);
			return;
		}

		const isTheSameParent =
			revalidateNode.oldItem.parentId === revalidateNode.newItem.parentId;

		if (isTheSameParent) {
			setTreeData((state) => {
				const recursive = (node: ITreeNode): ITreeNode => {
					if (node.id === revalidateNode.newItem.id) {
						return { ...node, name: revalidateNode.newItem.name };
					}

					if (node.children && node.children?.length > 0) {
						return {
							...node,
							children: node.children.map((item) => recursive(item)),
						};
					}

					return node;
				};

				return state?.map(recursive);
			});
		} else {
			setTimeout(() => {
				onNodeId(revalidateNode.oldItem.parentId || undefined);
			}, 500);

			setTimeout(() => {
				onNodeId(revalidateNode.newItem.parentId || undefined);
			}, 2000);
		}
	}, [revalidate, isToChangeUrl, onNodeId]);

	// HANDLE GO BACK FOLDER
	const [previouslyActiveItemId, setPreviouslyActiveItemId] =
		useState<string>();
	useEffect(() => {
		if (itemToGoUp?.parentId) {
			onClickId(itemToGoUp.parentId);
			!previouslyActiveItemId && setPreviouslyActiveItemId(itemToGoUp.id);
		}
	}, [
		itemToGoUp,
		onClickId,
		setPreviouslyActiveItemId,
		previouslyActiveItemId,
	]);

	// ADD CHILDREN RECURSIVELY
	useEffect(() => {
		if (
			isLoadingLoadItems ||
			isLoadingChildren ||
			!childrenItems ||
			childrenItems.length === 0
		)
			return;

		setTreeData((previousValue) => {
			const addChildrenRecursively = (
				nodes: Array<ITreeNode>
			): Array<ITreeNode> => {
				return nodes.map((node) => {
					if (
						treeSelection &&
						checkedItems?.some((item) => item.id === node.id)
					) {
						handleAddItems({
							items: childrenItems
								?.filter(
									(child) => !checkedItems?.some((item) => item.id === child.id)
								)
								.filter((item) => ({ ...item, children: undefined })),
							setState: setItemsState,
						});
					}

					// HANDLE CLICKED ITEM
					if (node.id === nodeId) {
						return {
							...node,
							children: childrenItems.filter(
								(item, i, arr) =>
									item.parentId === node.id &&
									!arr.slice(i + 1).some((nextItem) => nextItem.id === item.id)
							),
						};
					}

					// HANDLE ITEM WITH CHILDREN
					if (node.children) {
						return {
							...node,
							children: addChildrenRecursively(node.children),
						};
					}

					// HANDLE ITEM WITHOUT CHILDREN
					return node;
				});
			};

			// ADD CHILDREN AGAIN
			return addChildrenRecursively(previousValue || []);
		});
	}, [
		// checkedItems, // ENDLESS RERENDER
		childrenItems,
		isLoadingChildren,
		nodeId,
		setItemsState,
		treeSelection,
		isLoadingLoadItems,
	]);

	// ALL ITEMS STATE
	const [allVisibleItems, setAllVisibleItems] = useState<Array<ITreeNode>>([]);

	useEffect(() => {
		if (
			mainItems?.[0] &&
			!allVisibleItems.some((item) => item.id === mainItems?.[0]?.id)
		)
			setAllVisibleItems((s) => [...s, ...mainItems]);
	}, [mainItems, allVisibleItems]);

	// FIX CHECKED ITEMS
	const [checkedState, setCheckedState] = useState<Array<{ id: string }>>([]);

	// RENDERING TREE ITEMS
	const renderTree = useCallback(
		(nodes: Array<ITreeNode>) => {
			return nodes
				?.filter((node) => {
					return (
						// FILTER ERROR WHEN ITEM IS NOT MOVED
						!revalidate.some(
							(item) =>
								node.parentId &&
								node.id === item.newItem.id &&
								node.parentId !== item.newItem.parentId
						) &&
						// FILTER DELETED
						// !deleted.some((item) => item.id === node.id) &&
						// FILTER HIDDEN ITEMS
						!dontShowItemIds?.some((id) => id === node.id)
					);
				})
				.map((node) => {
					if (
						!checkedItems?.some((item) => item.id === node.id) &&
						checkedItems?.some((item) => item.id === node.parentId)
					)
						setItemsState?.((s) => [...s, node]);

					const isChecked =
						!!checkedItems?.some((item) => item.id === node.id) ||
						!!checkedState?.some((item) => item.id === node.id);

					if (!allVisibleItems.some((item) => item.id === node.id)) {
						setAllVisibleItems((s) => [...s, node]);
					}

					return (
						<StyledTreeItem
							key={`${node.id}`}
							itemId={`${node.id}`}
							slots={{
								expandIcon:
									firstIcon && !node.parentId ? firstIcon : ExpandIcon,
								collapseIcon:
									firstIcon && !node.parentId ? firstIcon : CollapsedIcon,
							}}
							label={
								<div
									className="flex items-center relative group"
									onClick={() => {
										onItemClick?.(node);
										if (previouslyActiveItemId === node.id) {
											handleItemSelectionToggle(false, node.id, true, true);
											setPreviouslyActiveItemId(undefined);
										}
									}}
								>
									{/* CHECKBOX */}
									{checkboxSelection && (
										<Checkbox
											onChangeFunc={() => {
												onCheckedItem?.(node, isChecked);
												if (treeSelection) {
													handleChangeItem?.({
														node: node,
														allVisibleBricks: allVisibleItems,
														setState: setItemsState,
													});
												} else {
													setCheckedState((s) =>
														isChecked
															? s.filter((item) => item.id !== node.id)
															: [...s, { id: node.id }]
													);
												}
											}}
											value={isChecked}
											defaultChecked={isChecked}
										/>
									)}

									{/* ICON */}
									{icon && icon}

									{/* FOLDER NAME */}
									<span>{node.name}</span>

									{/* HOVER / ACTIVE */}
									<span
										className={`${clickId === node.id ? "bg-color-inactive" : ""} w-[250%] h-8 z-[-1] -left-[200%] absolute group-hover:bg-color-inactive`}
									/>
									<span
										className={`${clickId === node.id ? "bg-color-inactive" : ""} w-full h-8 z-[-1] -right-6 absolute group-hover:bg-color-inactive`}
									/>
								</div>
							}
						>
							{node.hasChildren && node.id == nodeId && isLoadingChildren && (
								<>
									<Skeleton />
								</>
							)}

							{node.children && node.children.length > 0 ? (
								renderTree(node.children)
							) : loadItems?.some((item) => item.id === node.id) &&
							  !openedLoadIds.includes(node.id) ? (
								(handleItemSelectionToggle(
									false,
									node.id,
									false,
									true
								) as React.ReactNode)
							) : node.hasChildren && openedIds.includes(node.id) ? (
								(handleItemSelectionToggle(
									false,
									node.id,
									false
								) as React.ReactNode)
							) : // : (node.hasChildren && node.children === undefined) ||
							//   revalidate.some((item) => item.newItem.parentId === node.id) ? (
							// <span />
							// )
							node.hasChildren ? (
								<span />
							) : null}
						</StyledTreeItem>
					);
				});
		},
		[
			clickId,
			checkboxSelection,
			openedIds,
			dontShowItemIds,
			icon,
			firstIcon,
			onCheckedItem,
			treeSelection,
			allVisibleItems,
			checkedItems,
			checkedState,
			handleItemSelectionToggle,
			setItemsState,
			loadItems,
			openedLoadIds,
			isLoadingChildren,
			nodeId,
			previouslyActiveItemId,
			setPreviouslyActiveItemId,
			onItemClick,
			// revalidate,
		]
	);

	// RENDERING TREE
	const memoizedTree = useMemo(
		() => renderTree(treeData || []),
		[treeData, renderTree]
	);

	// HANDLE DEFAULT EXPANDED ITEMS
	const handleDefaultExpandedItemsChange = (
		_: React.SyntheticEvent,
		ids: Array<string>
	) => {
		setExpandedItems(ids);
	};

	// RETURN LOADING
	if (isLoadingMain || isLoadingLoadItems) {
		return (
			<div className="w-full mt-10">
				<Loader />
			</div>
		);
	} else {
		//@ts-ignore
		apiRef.current?.focusItem(null, clickId);

		return (
			<SimpleTreeView
				apiRef={apiRef}
				aria-label="customized"
				onExpandedItemsChange={handleDefaultExpandedItemsChange}
				defaultExpandedItems={loadItems?.map((item) => item.id)}
				slots={{
					expandIcon: ExpandIcon,
					collapseIcon: CollapsedIcon,
				}}
				sx={{ height: 240, flexGrow: 1 }}
				onItemSelectionToggle={handleItemSelectionToggle}
			>
				{memoizedTree}
			</SimpleTreeView>
		);
	}

	// RETURN TREE
};

export default TreeView;
