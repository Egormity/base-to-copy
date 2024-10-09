import { determineImageByExtension } from "./determine-image-by-extension";

export const openFileImage = ({
	type,
	id,
	name,
	extension,
}: {
	type: string;
	id: string;
	name: string;
	extension: string;
}): void => {
	// @ts-ignore
	const formattedName = name.replaceAll(" ", "_").replaceAll(".", "-");

	const addExtension = determineImageByExtension(formattedName.slice(-5))
		? ""
		: `-${extension.replace(".", "")}`;

	window.open(`/view/${type}/${id}/${formattedName}${addExtension}`, "_blank");
};
