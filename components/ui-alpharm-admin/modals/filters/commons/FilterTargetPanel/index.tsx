import { ReactComponent as ArrowBackIcon } from "@assets/icons/arrrow-back-icon.svg";
import { Skeleton } from "@mui/material";
import { FC, useState } from "react";

import { Checkbox } from "@/components/ui/inputs/Checkbox";

import { Filter } from "@/store/filters/contactFilterStore";

import { useGetMorePages } from "@/hooks/use-get-more-page";

import { useGetDictionariesTargetUsers } from "@/api/dictionaries";

interface IFilterTargetPanel {
	setIsTarget: any;
	allTargetsSelected: any;
	setAllTargetsSelected: any;
	//
	filters: any;
	addFilter: any;
	removeFilter: any;
}

const FilterTargetPanel: FC<IFilterTargetPanel> = ({
	setAllTargetsSelected,
	allTargetsSelected,
	setIsTarget,
	//
	filters,
	addFilter,
	removeFilter,
}) => {
	const [targetUser, setTargetUserSearch] = useState<any>([]);
	const {
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		items: targetUsers,
	} = useGetDictionariesTargetUsers(targetUser);

	const { loadMoreRef } = useGetMorePages({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	});

	const handleSelectAllTargets = (checked: boolean) => {
		setAllTargetsSelected(checked);

		if (checked) {
			targetUsers?.forEach(
				(user: { postName: string; name: string; id: string }) =>
					addFilter("targetUserIds", user, user.name)
			);
		} else {
			targetUsers?.forEach(
				(user: { postName: string; name: string; id: string }) =>
					removeFilter("targetUserIds", user, user.name)
			);
		}
	};

	const handleSelectTargetUser = (
		user: { postName: string; name: string; id: string },
		checked: boolean
	) => {
		if (checked) {
			addFilter("targetUserIds", user, user.name);
		} else {
			removeFilter("targetUserIds", user, user.name);
			setAllTargetsSelected(false);
		}
	};

	return (
		<>
			<div className="flex  items-center justify-center px-4 gap-1">
				<ArrowBackIcon
					onClick={() => setIsTarget(false)}
					className="cursor-pointer"
				/>
				<h1 className="text-xl py-5">Выбор коллег для отслеживания</h1>
			</div>
			<div className="flex   bg-[#F6F6F6] mb-4 max-h-[34px] rounded-lg text-sm mx-4 px-2 py-2">
				<input
					value={targetUser}
					onChange={(e) => {
						setTargetUserSearch(e.target.value);
					}}
					className="w-full flex-1 outline-none bg-transparent"
					placeholder="Поиск"
				/>
			</div>
			<div className="px-4">
				<div className="mb-4">
					<Checkbox
						value={allTargetsSelected}
						label="Выделить всё"
						onChange={(e) => {
							handleSelectAllTargets(e.target.checked);
						}}
					/>
				</div>
				{targetUsers?.map(
					(user: { postName: string; name: string; id: string }) => (
						<Checkbox
							id={user.id}
							key={user.id}
							value={filters.some(
								(filter: Filter) =>
									filter.name === "targetUserIds" &&
									filter.values.some(
										//@ts-ignore
										(obj: { id: string }) => obj.id.id === user.id
									)
							)}
							label={user.name}
							subtitle={user.postName}
							onChange={(e) => {
								handleSelectTargetUser(user, e.target.checked);
							}}
						/>
					)
				)}
			</div>
			{isFetchingNextPage && <Skeleton className="w-full" />}
			{hasNextPage && (
				<div
					ref={loadMoreRef}
					style={{ height: "1px" }}
				/>
			)}
		</>
	);
};

export default FilterTargetPanel;
