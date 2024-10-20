import { RxMagnifyingGlass } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { borderDarkWithRing } from "../utils/classNames";
import { useDebounce } from "../../hooks/useDebounce";

export default function InputSearch({ width }: { width?: string }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState("");
	const newSearch = useDebounce(search, 200);

	useEffect(() => {
		if (newSearch) {
			searchParams.set("search", newSearch);
			setSearchParams(searchParams);
		} else {
			if (searchParams.get("search")) {
				searchParams.set("search", "");
				setSearchParams(searchParams);
			}
		}
	}, [newSearch, searchParams, setSearchParams]);

	return (
		<div className={`${width} relative`}>
			<input
				id="search"
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className={`${borderDarkWithRing} ${width} rounded-2xl px-5 py-4`}
			/>

			<label
				htmlFor="search"
				className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-4xl text-zinc-200"
			>
				<RxMagnifyingGlass />
			</label>
		</div>
	);
}
