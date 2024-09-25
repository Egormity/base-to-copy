import { useSearch } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";

export const useSearchInput = () => {
	const { search } = useSearch({
		strict: false,
	});

	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState(search || "");

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
		setValue(e.target.value);

	const removeValue = () => {
		setValue("");
	};

	const onFocus = () => setFocused(true);
	const onBlur = () => setFocused(false);

	return {
		focused,
		value,
		handleSearch,
		removeValue,
		onFocus,
		onBlur,
	};
};
