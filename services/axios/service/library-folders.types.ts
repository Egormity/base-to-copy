export interface ILibraryFolder {
	folderTypeId: 1;
	parentId: string | null;
	name: string;
	id: string;
	isSearchResult: boolean;
	fullPath: string;
	hasChildren: boolean;
	children?: Array<ILibraryFolder>;
}

export interface ILibraryFoldersResponse {
	success: boolean;
	message: string;
	data: Array<ILibraryFolder>;
}

export interface ILibraryFoldersDataResponse {
	data: Array<ILibraryFolder>;
}
