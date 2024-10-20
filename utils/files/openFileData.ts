export const openFileData = (fileData: string, fileType: string): string => {
	const decodedData = atob(fileData);
	const binaryData = new Uint8Array(decodedData.length);

	for (let i = 0; i < decodedData.length; i++) {
		binaryData[i] = decodedData.charCodeAt(i);
	}

	const blob = new Blob([binaryData], {
		type: fileType,
	});
	const url = URL.createObjectURL(blob);

	window.open(url, "_blank");

	return url;
};
