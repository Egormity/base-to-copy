function blobToFile(blob: Blob, filename: string) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const data = reader.result;
			const type = blob.type;
			resolve(new File([data], filename, { type }));
		};
		reader.onerror = reject;
		reader.readAsArrayBuffer(blob);
	});
}

export const convertFileDataToFile = ({
	fileData,
	fileType,
	filename,
	handleFileFunction,
}: {
	fileData: string;
	fileType: string;
	filename: string;
	handleFileFunction?: (file: File) => void;
}): void => {
	fetch(`data:${fileType};base64,${fileData}`)
		.then((res) => res.blob())
		.then((item) => {
			blobToFile(item, filename)
				.then((file) => handleFileFunction?.(file))
				.catch((error) => console.log(error));
		})
		.catch((error) => console.log(error));
};
