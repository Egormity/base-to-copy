import { axiosWithAuth } from "@/api/auth";

import type { ILibraryFoldersResponse } from "./library-folders.types";

class LibraryFoldersServiceClass {
	private readonly BASE_URL = "/library/folders";

	public async getLibraryFolders({
		searchQuery,
		id,
		parentId,
		folderTypeId,
	}: {
		searchQuery?: string;
		id?: string;
		parentId?: string | null;
		folderTypeId?: number;
	}): Promise<ILibraryFoldersResponse> {
		try {
			const response = await axiosWithAuth.get<ILibraryFoldersResponse>(
				this.BASE_URL,
				{
					params: {
						search: searchQuery,
						id,
						folderTypeId,
						parentId,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to fetch library folders");
		}
	}

	public async getLibraryFoldersByParentID({
		parentId,
		folderTypeId,
	}: {
		parentId?: string | null;
		folderTypeId: number;
	}): Promise<ILibraryFoldersResponse> {
		try {
			const response = await axiosWithAuth.get<ILibraryFoldersResponse>(
				this.BASE_URL,
				{
					params: { parentId, folderTypeId },
				}
			);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to fetch library data by parent ID");
		}
	}

	public async createLibraryFolder(
		data: any
	): Promise<ILibraryFoldersResponse> {
		console.log(data);
		try {
			const response = await axiosWithAuth.post<ILibraryFoldersResponse>(
				this.BASE_URL,
				data
			);
			console.log(response);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to create library folder");
		}
	}

	public async deleteLibraryFolder(id: string): Promise<void> {
		try {
			console.log(id);
			await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		} catch (error) {
			console.log(error);
			throw new Error("Failed to delete library folder");
		}
	}

	public async updateLibraryFolder({
		id,
		data,
	}: {
		id: string;
		data: { folderTypeId: number; name: string; parentId: string | null };
	}): Promise<ILibraryFoldersResponse> {
		try {
			const response = await axiosWithAuth.put<ILibraryFoldersResponse>(
				`${this.BASE_URL}/${id}`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to update library folder");
		}
	}
}

export const LibraryFoldersService = new LibraryFoldersServiceClass();
