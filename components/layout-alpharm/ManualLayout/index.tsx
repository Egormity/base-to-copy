import { useQuery } from "@tanstack/react-query";
import { memo, useEffect } from "react";

import List from "@/components/layout/ManualLayout/list-block";

import { useThemeStore } from "@/store/theme/themeStore";

import styles from "./ManualLayout.module.scss";
import { ITheme, themesService } from "@/services/commons/theme";

type ManualListLayoutProps = {
	children: React.ReactNode;
};

const MemoizedList = memo(List);

function ManualListLayout({ children }: ManualListLayoutProps) {
	const setTheme = useThemeStore((state) => state.setTheme);

	const { data: themes = [] } = useQuery<ITheme[], Error>({
		queryKey: ["/themes"],
		queryFn: () => themesService.getThemes(),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (themes.length > 0) {
			const activeTheme = themes.find((theme) => theme.checked === true);
			if (activeTheme) {
				setTheme(activeTheme);
			}
		}
	}, [themes, setTheme]);

	return (
		<div className={styles["wrapper"]}>
			<MemoizedList />
			<main>{children}</main>
		</div>
	);
}

export default ManualListLayout;
