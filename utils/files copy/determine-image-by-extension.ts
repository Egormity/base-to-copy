export const determineImageByExtension = (validate: string): string | null => {
	let extension = null;

	if (validate.includes("webp")) extension = "webp";
	if (validate.includes("jpeg")) extension = "jpeg";
	if (validate.includes("jpg")) extension = "jpg";
	if (validate.includes("png")) extension = "png";
	if (validate.includes("gif")) extension = "gif";
	if (validate.includes("WEBP")) extension = "WEBP";
	if (validate.includes("JPEG")) extension = "JPEG";
	if (validate.includes("JPG")) extension = "JPG";
	if (validate.includes("PNG")) extension = "PNG";
	if (validate.includes("GIF")) extension = "GIF";

	return extension;
};
