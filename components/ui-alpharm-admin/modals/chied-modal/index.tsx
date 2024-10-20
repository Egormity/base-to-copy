import { ReactComponent as BackIcon } from "@assets/icons/arrrow-back-icon.svg";
import { debounce } from "@mui/material";
import cn from "classnames";
import { FC, useCallback, useEffect, useState } from "react";

import { useGetMorePages } from "@/hooks/use-get-more-page";

import { useGetCompanyStructureEmployeeById } from "@/api/commons/company-structures/divisons-employee";

import { ButtonCreateText } from "../../buttons/ButtonCreateText";
import CompanyStructuresTreeView from "../../tree-view/CompanyStructuresTreeView";

import { ICompanyStructure } from "@/services/commons/company-structures/company-structure.types";

interface ISelectModal {
	title: string;
	onSelect: (value: any) => void;
	setIsModalOpen?: (value: boolean) => void;
}

const SelectChiefModal: FC<ISelectModal> = ({
	title,
	onSelect,
	setIsModalOpen = () => {},
}) => {
	const [currentEmploy, setCurrentEmploy] = useState<any>();

	const [inputValue, setInputValue] = useState<string>("");
	const [debouncedValue, setDebouncedValue] = useState<string>("");
	const [node, setNode] = useState<ICompanyStructure | undefined>();

	const {
		items: dataEmployee,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useGetCompanyStructureEmployeeById(node?.id, debouncedValue);

	const onChangeDebounced = useCallback(
		debounce((value: any) => {
			setDebouncedValue(value);
		}, 500),
		[]
	);

	useEffect(() => {
		onChangeDebounced(inputValue);
	}, [onChangeDebounced, inputValue]);

	// Добавляем эффект для IntersectionObserver

	const { loadMoreRef } = useGetMorePages({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	});

	return (
		<>
			<div className="flex items-center gap-1 float-start mb-8">
				<BackIcon
					onClick={() => setIsModalOpen(false)}
					className="cursor-pointer"
				/>
				<div className="text-xl">{title}</div>
			</div>
			<div className="flex w-full bg-[#F6F6F6] p-2 mb-4 max-h-[34px] rounded-lg text-sm">
				<input
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					className="w-full flex-1 outline-none bg-transparent"
					placeholder="Поиск"
				/>
			</div>

			<div className="flex flex-col items-end">
				<div className="grid grid-cols-2 gap-8 min-w-[900px]">
					<div className="w-[450px] h-[400px] scrollbar-thin border-[1px] overflow-auto rounded-lg">
						<CompanyStructuresTreeView
							setNodeOnClick={setNode}
							isToChangeUrl={false}
						/>
					</div>
					<div className="h-[400px] scrollbar-thin overflow-auto">
						{dataEmployee?.length > 0 ? (
							<>
								<ul className="flex flex-col gap-1">
									{dataEmployee.map((item) => (
										<li
											key={item.userId}
											className={cn(
												"bg-white p-4 hover:bg-color-inactive text-left cursor-pointer",
												{
													"!bg-color-inactive":
														item.userId === currentEmploy?.userId,
												}
											)}
											onClick={() =>
												setCurrentEmploy({
													...item,
													id: item.userId,
													label: item.fullName,
												})
											}
										>
											{item.fullName}
										</li>
									))}
									{/* Элемент для наблюдения */}
									<div ref={loadMoreRef} />
								</ul>
								{isFetchingNextPage && (
									<div className="text-center py-2">Загрузка...</div>
								)}
							</>
						) : (
							<div className="flex h-full w-full justify-center items-center">
								В выбранном подразделении нет сотрудников
							</div>
						)}
					</div>
				</div>

				<ButtonCreateText
					text="Выбрать"
					className=""
					disabled={!currentEmploy}
					onClick={() => {
						onSelect(currentEmploy);
						setIsModalOpen(false);
					}}
				/>
			</div>
		</>
	);
};

export default SelectChiefModal;
