import { ITreeNode } from ".";
import React from "react";

type IItem = ITreeNode;

export function filterErrors(array: Array<IItem>) {
	const filteredArr = array.filter((item) => !!item?.id);

	return filteredArr.filter(
		(item, i, arr) => !arr.slice(i + 1).some((el) => el.id === item.id)
	);
}

// RECURSIVE FILTER BRICKS
export function filterRecursive(items: Array<IItem>) {
	const isParent = items.some((item) =>
		items.some((i) => i.id === item.parentId)
	);
	if (!isParent) return items;

	return filterRecursive(
		items.filter((item) => {
			return !items.some((i) => i.id === item.parentId);
		})
	);
}

export function handleChangeItem({
	node,
	allVisibleBricks,
	setState,
}: {
	node: IItem;
	allVisibleBricks: Array<IItem>;
	setState?: React.Dispatch<React.SetStateAction<Array<IItem>>>;
}) {
	setState?.((s) => {
		// HANDLE IF NODE IS TO BE REMOVED
		const isNodeToRemove = s.some((el) => el.id === node.id);

		// REMOVE ALL THE CHECKED BRICKS FROM CLICKED DOWN THE TREE
		function filterCheckedRecursivelyDown(
			arr: Array<IItem>,
			node: IItem
		): Array<IItem> {
			// 1 LEVEL NODE CLICK
			// if (!node.parentId) return [];

			// const children = arr.find((item) => item.parentId === node.id);
			// if (!children) return arr;

			// return filterCheckedRecursivelyDown(
			// 	arr.filter((item) => item.parentId !== node.id),
			// 	children
			// );

			return arr.filter(
				(item) => !item.fullPath?.includes(node?.fullPath as string)
			);
		}

		// REMOVE ALL THE CHECKED BRICKS FROM CLICKED UP THE TREE
		function filterCheckedRecursivelyUp(
			arr: Array<IItem>,
			node: IItem
		): Array<IItem> {
			const parent = arr.find((item) => item.id === node.parentId);
			if (!parent) return arr;

			return filterCheckedRecursivelyUp(
				arr.filter((item) => item.id !== node.parentId),
				parent
			);
		}

		// HANDLE ADD CHECKBOXES RECURSIVELY FROM NODE AND DOWN THE TREE
		function addChildrenCheckedRecursively(
			arr: Array<IItem>,
			node: IItem
		): Array<IItem> {
			// 1 LEVEL NODE CLICK
			if (!node.parentId) return [...allVisibleBricks];

			const isChildren = allVisibleBricks.some((item) => item.id === node.id);
			if (!isChildren) return arr;

			return arr.concat(
				arr.flatMap((item) =>
					addChildrenCheckedRecursively(
						allVisibleBricks.filter((el) => el.parentId === item.id),
						item
					)
				)
			);
		}

		function addParentCheckedRecursively(
			arr: Array<IItem>,
			node: IItem | undefined
		): Array<IItem> {
			const shouldAddParent =
				arr.filter((item) => item.parentId === node?.parentId).length ===
				allVisibleBricks.filter((item) => item.parentId === node?.parentId)
					.length;

			// console.log(arr, node, shouldAddParent);
			if (!node?.parentId)
				return node && shouldAddParent ? [...arr, node] : arr;

			const parent = allVisibleBricks.find((item) => item.id === node.parentId);

			return addParentCheckedRecursively(
				shouldAddParent && parent ? arr.concat(parent) : arr,
				parent
			);
		}

		const arr = isNodeToRemove
			? filterCheckedRecursivelyUp(
					filterCheckedRecursivelyDown(
						s.filter((item) => item.id !== node.id),
						node
					).filter((item) => item.id !== node.id),
					node
				)
			: addParentCheckedRecursively(
					[
						...s.filter((el) => el.id !== node.id),
						...addChildrenCheckedRecursively([node], node),
					],
					node
				);

		return filterErrors(arr);
	});
}

export function handleAddItems({
	items,
	setState,
}: {
	items: Array<IItem>;
	setState?: React.Dispatch<React.SetStateAction<Array<IItem>>>;
}) {
	setState?.((s) =>
		filterErrors([
			...s,
			...items.filter(
				(item) =>
					!s.some((el) => el.id === item.id) &&
					s.some((el) => el.id === item.parentId)
			),
		])
	);
}
