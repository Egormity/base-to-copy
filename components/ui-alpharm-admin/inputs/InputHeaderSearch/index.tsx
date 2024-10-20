import { ReactComponent as BackArrowIcon } from "@assets/icons/arrrow-back-icon.svg";
import { ReactComponent as RemoveIcon } from "@assets/icons/cross.svg";
import debounce from "@mui/material/utils/debounce";
import { useNavigate } from "@tanstack/react-router";
import cn from "classnames";
import { type FC, useCallback, useEffect } from "react";

import styles from "./InputHeaderSearch.module.scss";
import { useSearchInput } from "./useSearch";

interface IInputHeaderSearch {
	handlerIsSearch?: () => void;
	param?: string;
	classNameInput?: string;
	stylesInput?: Record<string, string | number>;
	shouldNavigate?: boolean;
}

const InputHeaderSearch: FC<IInputHeaderSearch> = ({
	handlerIsSearch,
	param = "search",
	classNameInput = "",
	stylesInput = {},
	shouldNavigate = true,
}) => {
	const navigate = useNavigate();
	const { focused, value, removeValue, onFocus, onBlur, handleSearch } =
		useSearchInput();

	const debouncedHandleSearch = useCallback(
		debounce((searchValue: string) => {
			navigate({
				search: () => ({ [param]: searchValue }),
				params: {},
			}).catch(() => {});
		}, 500),
		[]
	);

	useEffect(() => {
		debouncedHandleSearch(value);
	}, [value, debouncedHandleSearch]);

	return (
		<div className={styles["search-active"]}>
			<div className={styles["search-container"]}>
				<BackArrowIcon
					onClick={() => {
						shouldNavigate &&
							navigate({
								search: () => ({ [param]: undefined }),
								params: {},
							}).catch(() => {});
						handlerIsSearch?.();
					}}
				/>
				<div
					className={cn(styles["input-container"], {
						"border-[--color-active]": focused,
					})}
				>
					<input
						value={value}
						onBlur={onBlur}
						onFocus={onFocus}
						onChange={handleSearch}
						className={cn(styles["input-field"], classNameInput)}
						style={stylesInput}
					/>

					{value && (
						<RemoveIcon
							onClick={removeValue}
							className={styles["remove-icon"]}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default InputHeaderSearch;
