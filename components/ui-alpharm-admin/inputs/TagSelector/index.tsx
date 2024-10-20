import { ReactComponent as IconCancel } from "@assets/icons/cross-tag.svg";
import { ReactComponent as PlusIcon } from "@assets/icons/plus.svg";
import cn from "classnames";
import { type FC, useState } from "react";
import {
	type Control,
	Controller,
	type RegisterOptions,
} from "react-hook-form";

import Modal from "../../modals/modal";
import SelectModalTest from "../../modals/select-modal-test";

import styles from "./TagSelectorModal/TagSelector.module.scss";

interface TagSelectorProps {
	name: string;
	label?: string;
	className?: string;
	placeholder?: string;
	control: Control<any>;
	rules?: RegisterOptions<any, string>;
	data?: Array<{ id: number | string; name: string }>;
	isLoading: boolean;
	required: boolean;
	defaultChecked?: Array<{ id: number | string; name: string }>;
	onlyDefaultValues?: boolean;
	classNameInput?: string;
	onRemove?: (tagId: number | string) => void;
	onSearch?: React.Dispatch<React.SetStateAction<string>>;
	fetchNextPage?: () => Promise<void>;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
}

export const TagSelector: FC<TagSelectorProps> = ({
	name,
	label,
	required,
	control,
	rules,
	data = [],
	isLoading,
	className,
	classNameInput = "",
	defaultChecked = [],
	onlyDefaultValues = false,
	onRemove,
	onSearch,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleClose = (): void => {
		setIsModalOpen(!isModalOpen);
	};

	const defaultCheckedNew = defaultChecked?.slice(0)?.filter((item) => !!item);
	const finalData = [...defaultCheckedNew, ...data];

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { onChange, value = defaultCheckedNew } }) => {
				const handleTagRemove = (tagId: number) => {
					// @ts-ignore
					const updatedTags = value.filter((tag: any) => tag.id !== tagId);
					onChange(updatedTags);
					onRemove && onRemove(tagId);
				};

				return (
					<div className={`${className} flex flex-col`}>
						{label && (
							<div className={cn(styles["input-title"])}>
								{label} {required && <span aria-hidden="true"> *</span>}
							</div>
						)}
						<div
							className={`${classNameInput} border-primary-gray-light border-[1px] py-2 rounded-lg mt-2 flex  items-end px-2 justify-between `}
						>
							<div className="flex  flex-wrap gap-2 justify-start w-full ">
								{value?.map((tag: any) => (
									<div
										key={tag?.id}
										className="items-center bg-color-inactive flex px-2 w-auto min-h-[33px] border-color-active border-[1px] rounded-2xl text-color-active text-sm gap-1"
									>
										<div>{tag?.name}</div>
										<IconCancel
											className="cursor-pointer text-color-active"
											onClick={() => handleTagRemove(tag?.id)}
										/>
									</div>
								))}
							</div>
							{onlyDefaultValues ? (
								<span className="h-[33px]" />
							) : (
								<div
									className="rounded-full h-[33px] w-[35px] bg-color-active cursor-pointer flex items-center justify-center ml-1.5"
									onClick={handleClose}
								>
									<PlusIcon
										width={16}
										height={16}
									/>
								</div>
							)}
						</div>
						<Modal
							isOpen={isModalOpen}
							onCancel={handleClose}
						>
							<SelectModalTest
								title={label || name}
								type="checkbox"
								data={finalData?.filter(
									(element, index) =>
										!finalData
											.slice(index + 1)
											.some((el) => el.id === element.id)
								)}
								isLoading={isLoading}
								valuesChecked={value}
								//@ts-ignore
								onSelect={(selected: any[]) => {
									// console.log(selected);
									onChange(selected);
									handleClose();
								}}
								onSearch={onSearch}
								setIsModalOpen={setIsModalOpen}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								isFetchingNextPage={isFetchingNextPage}
							/>
						</Modal>
					</div>
				);
			}}
		/>
	);
};
