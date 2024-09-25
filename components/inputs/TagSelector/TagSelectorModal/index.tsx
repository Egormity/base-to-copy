import { TagSelector } from "..";
import type { Dispatch, FC, SetStateAction } from "react";
import type { Control, RegisterOptions } from "react-hook-form";

interface InputModalControllerProps {
	name: string;
	label?: string;
	className?: string;
	placeholder?: string;
	control: Control<any>;
	rules?: RegisterOptions<any>;
	data?: Array<{ id: number | string; name: string }>;
	isLoading: boolean;
	defaultChecked?: Array<{ id: number | string; name: string }> | [];
	onlyDefaultValues?: boolean;
	classNameInput?: string;
	onRemove?: (tagId: number | string) => void;
	onSearch?: Dispatch<SetStateAction<string>>;
}

export const TagSelectorModal: FC<InputModalControllerProps> = ({
	name,
	label,
	className,
	placeholder,
	control,
	rules,
	data,
	isLoading,
	defaultChecked,
	onlyDefaultValues,
	classNameInput,
	onRemove,
	onSearch,
}) => {
	return (
		<TagSelector
			name={name}
			label={label}
			className={className}
			placeholder={placeholder}
			control={control}
			rules={rules}
			required={!!rules?.required}
			data={data}
			isLoading={isLoading}
			defaultChecked={defaultChecked}
			onlyDefaultValues={onlyDefaultValues}
			classNameInput={classNameInput}
			onRemove={onRemove}
			onSearch={onSearch}
		/>
	);
};
