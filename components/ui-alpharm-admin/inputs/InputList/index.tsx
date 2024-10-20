import { ReactComponent as DeleteIcon } from "@assets/icons/red-cross-icon.svg";
import React, { useState } from "react";

import InputEdit from "../InputEdit";

interface InputListProps {
	label: string;
	value?: string;
}

const InputList: React.FC<InputListProps> = ({ label, value }) => {
	const [inputs, setInputs] = useState<string[]>([""]);

	const handleInputChange = (index: number, value: string) => {
		const newInputs = [...inputs];
		newInputs[index] = value;
		setInputs(newInputs);
	};

	const handleAddInput = () => {
		setInputs([...inputs, ""]);
	};

	const handleRemoveInput = (index: number) => {
		if (inputs.length === 1) return; // always keep at least one input
		const newInputs = inputs.filter((_, i) => i !== index);
		setInputs(newInputs);
	};

	return (
		<div>
			{inputs.map((_, index) => (
				<div
					key={index}
					className="flex  items-center mb-4 max-w-[350px] gap-4"
				>
					<InputEdit
						label={index === 0 ? label : undefined}
						value={value}
						onChange={(e) => handleInputChange(index, e.target.value)}
					/>
					{index > 0 && (
						<DeleteIcon
							onClick={() => handleRemoveInput(index)}
							className="cursor-pointer"
						/>
					)}
				</div>
			))}
			<button
				type="button"
				onClick={handleAddInput}
				className="mt-4 p-2 bg-white text-color-active max-w-[120px] w-full border-[1px] border-primary-gray-light rounded-3xl text-xs"
			>
				Добавить
			</button>
		</div>
	);
};

export default InputList;
