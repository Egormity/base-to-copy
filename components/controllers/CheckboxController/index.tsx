import type { FC } from "react";
import { Controller } from "react-hook-form";

import { Checkbox } from "../../inputs/Checkbox";

export const CheckboxController: FC<any> = ({
	control,
	rules,
	name,
	label,
	classNameWrapper,
	defaultChecked = false,
}) => {
	// console.log(defaultChecked);
	return (
		<Controller
			control={control}
			rules={rules}
			name={name}
			defaultValue={defaultChecked}
			render={({ field: { onChange, value } }) => (
				<Checkbox
					value={value}
					label={label}
					onChange={(e) => onChange(e.target.checked)}
					classNameWrapper={classNameWrapper}
				/>
			)}
		/>
	);
};
