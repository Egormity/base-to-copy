import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Dropdown } from "@/components/ui/inputs";

import { ReactComponent as IconMaterials } from "@/assets/icons/library-materials.svg";
// import { ReactComponent as IconMedia } from "@/assets/icons/library-media.svg";
import { ReactComponent as IconPolls } from "@/assets/icons/library-polls.svg";

// import { ReactComponent as IconPresentations } from "@/assets/icons/library-presentations.svg";
import { useLibraryDropdownVisibility } from "./use-library-dropdown-visibility";

type LibraryListLayoutProps = {
	children: React.ReactNode;
};

const libraryTypes = [
	// {
	// 	id: "1",
	// 	name: "Медиа",
	// 	link: "",
	// 	icon: <IconMedia />,
	// },
	{
		id: "2",
		name: "Материалы",
		link: "materials",
		icon: <IconMaterials />,
	},
	{
		id: "3",
		name: "Опросы",
		link: "polls",
		icon: <IconPolls />,
	},
	// {
	// 	id: "4",
	// 	name: "Презентации",
	// 	link: "",
	// 	icon: <IconPresentations />,
	// },
];

export default function LibraryListLayout({
	children,
}: LibraryListLayoutProps): JSX.Element {
	const [selectedValueId, setSelectedValueId] = useState(libraryTypes[1]?.id);

	// ROUTER
	const router = useRouter();

	// SET DROPDOWN VALUE ON REFRESH
	useEffect(() => {
		const path = router.latestLocation.pathname.split("/")[2];

		if (libraryTypes.some((element) => element.link === path))
			setSelectedValueId(
				libraryTypes.find((element) => element.link === path)?.id
			);
	}, [router.latestLocation.pathname]);

	// SET VISIBILITY OF DROPDOWN
	const { isVisible } = useLibraryDropdownVisibility();

	return (
		<>
			{/* LIBRARY NAVIGATION */}
			{isVisible && (
				<Dropdown
					options={libraryTypes}
					value={selectedValueId}
					className="cursor-pointer absolute left-4 w-[170px]"
					classNameInput="!border-none !text-xl gap-1 !justify-start"
					onSelect={(option: string | number): void => {
						router.history.push(
							`/library/${libraryTypes.find((element) => element.id === option)?.link}`
						);
						setSelectedValueId(option + "");
					}}
				/>
			)}

			{/* LIBRARY PAGES */}
			{children}
		</>
	);
}
