import cn from "classnames";
import React, { useState } from "react";

interface IInputCode {
	length: number;
	onComplete: (code: string) => void;

	error: string | null;
}

const InputCode: React.FC<IInputCode> = ({ length, onComplete, error }) => {
	const [values, setValues] = useState<string[]>(Array(length).fill(""));

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newValues = [...values];
		const { value } = e.target;

		if (/^[0-9a-zA-Z]$/.test(value) || value === "") {
			newValues[index] = value;
			setValues(newValues);

			if (value && index < length - 1) {
				const nextSibling = document.getElementById(`code-input-${index + 1}`);
				if (nextSibling) {
					(nextSibling as HTMLInputElement).focus();
				}
			}

			if (value === "" && index > 0) {
				const prevSibling = document.getElementById(`code-input-${index - 1}`);
				if (prevSibling) {
					(prevSibling as HTMLInputElement).focus();
				}
			}
		}

		if (newValues.every((val) => val.length > 0)) {
			onComplete(newValues.join(""));
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Backspace" && !values[index] && index > 0) {
			const prevSibling = document.getElementById(`code-input-${index - 1}`);
			if (prevSibling) {
				(prevSibling as HTMLInputElement).focus();
			}
		}
	};

	return (
		<div className="flex space-x-4">
			{values.map((val, index) => (
				<input
					placeholder="-"
					key={index}
					id={`code-input-${index}`}
					type="text"
					maxLength={1}
					value={val}
					onChange={(e) => handleChange(e, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					className={cn(
						"w-10 h-12 text-center text-lg border border-gray-300 rounded outline-none",
						{
							"!border-[#FF0000]": error,
						}
					)}
				/>
			))}
		</div>
	);
};

export default InputCode;
