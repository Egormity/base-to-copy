export const determineImageByExtension = (validate: string) => {
	return (
		validate.includes("webp") ||
		validate.includes("jpeg") ||
		validate.includes("jpg") ||
		validate.includes("png") ||
		validate.includes("gif") ||
		validate.includes("WEBP") ||
		validate.includes("JPEG") ||
		validate.includes("JPG") ||
		validate.includes("PNG") ||
		validate.includes("GIF")
	);
};
