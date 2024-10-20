import { useState } from "react";

import {
	useGetDictionariesCities,
	useGetDictionariesNetworks,
	useGetDictionariesOrganizationKinds,
	useGetDictionariesOrganizationStatus,
	useGetDictionariesOrganizationTypes,
} from "@/api/dictionaries";
import { useGetDictionariesOrganizationCategories } from "@/api/dictionaries/organization-categories/get";

interface IFunctionGetDataFilter {
	isOpen: boolean;
}

export const getDataFilterOrganizationTerritories = ({
	isOpen,
}: IFunctionGetDataFilter) => {
	const [searchParam, setSearchParam] = useState<{
		cities: string;
		organizationTypes?: string;
		organizationKinds?: string;
		organizationStatus: string;
		organizationCategory: string;
		targetUsers: string;
		networks: string;
	}>({
		cities: "",
		organizationTypes: "",
		organizationKinds: "",
		organizationStatus: "",
		organizationCategory: "",
		targetUsers: "",
		networks: "",
	});

	const {
		items: cities,
		isLoading: isLoadingCities,
		fetchNextPage: fetchNextPageCities,
		hasNextPage: hasNextPageCities,
		isFetchingNextPage: isFetchingNextPageCities,
	} = useGetDictionariesCities(searchParam.cities, isOpen);

	const {
		items: organizationTypes,
		isLoading: isLoadingTypes,
		fetchNextPage: fetchNextPageTypes,
		hasNextPage: hasNextPageTypes,
		isFetchingNextPage: isFetchingNextPageTypes,
	} = useGetDictionariesOrganizationTypes(
		searchParam.organizationTypes,
		isOpen
	);

	const {
		items: organizationKinds,
		isLoading: isLoadingKinds,
		fetchNextPage: fetchNextPageKinds,
		hasNextPage: hasNextPageKinds,
		isFetchingNextPage: isFetchingNextPageKinds,
	} = useGetDictionariesOrganizationKinds(
		searchParam.organizationKinds,
		undefined,
		isOpen
	);

	const {
		items: organizationStatus,
		isLoading: isLoadingStatus,
		fetchNextPage: fetchNextPageStatuses,
		hasNextPage: hasNextPageStatuses,
		isFetchingNextPage: isFetchingNextPageStatuses,
	} = useGetDictionariesOrganizationStatus(
		searchParam.organizationStatus,
		isOpen
	);

	const {
		items: organizationCategory,
		isLoading: isLoadingCategory,
		fetchNextPage: fetchNextPageCategories,
		hasNextPage: hasNextPageCategories,
		isFetchingNextPage: isFetchingNextPageCategories,
	} = useGetDictionariesOrganizationCategories(
		searchParam.organizationCategory,
		isOpen
	);

	const {
		items: networks,
		isLoading: isLoadingNetworks,
		fetchNextPage: fetchNextPageNetworks,
		hasNextPage: hasNextPageNetworks,
		isFetchingNextPage: isFetchingNextPageNetworks,
	} = useGetDictionariesNetworks(undefined, searchParam.networks);

	return {
		setSearchParam,
		data: {
			cities: {
				data: cities,
				isLoading: isLoadingCities,
				fetchNextPage: fetchNextPageCities,
				hasNextPage: hasNextPageCities,
				isFetchingNextPage: isFetchingNextPageCities,
				searchParam: searchParam.cities,
				//
				label: "Населенный пункт",
				name: "city",
				type: "list",
				typeValue: "id",
			},
			organizationTypes: {
				data: organizationTypes,
				isLoading: isLoadingTypes,
				fetchNextPage: fetchNextPageTypes,
				hasNextPage: hasNextPageTypes,
				isFetchingNextPage: isFetchingNextPageTypes,
				searchParam: searchParam.organizationTypes,
				//
				label: "Тип учреждения",
				name: "InstitutionTypeIds",
				type: "list",
				typeValue: "id",
			},
			organizationKinds: {
				data: organizationKinds,
				isLoading: isLoadingKinds,
				fetchNextPage: fetchNextPageKinds,
				hasNextPage: hasNextPageKinds,
				isFetchingNextPage: isFetchingNextPageKinds,
				searchParam: searchParam.organizationKinds,
				//
				label: "Вид учреждения",
				name: "InstitutionKindIds",
				type: "list",
				typeValue: "id",
			},
			networks: {
				data: networks,
				isLoading: isLoadingNetworks,
				fetchNextPage: fetchNextPageNetworks,
				hasNextPage: hasNextPageNetworks,
				isFetchingNextPage: isFetchingNextPageNetworks,
				searchParam: searchParam.networks,
				//
				label: "Сеть",
				name: "Network",
				type: "list",
			},
			organizationCategory: {
				data: organizationCategory,
				isLoading: isLoadingCategory,
				fetchNextPage: fetchNextPageCategories,
				hasNextPage: hasNextPageCategories,
				isFetchingNextPage: isFetchingNextPageCategories,
				searchParam: searchParam.organizationCategory,
				//
				label: "Категории",
				name: "InstitutionCategoryIds",
				type: "list",
				typeValue: "id",
			},
			organizationStatus: {
				data: organizationStatus,
				isLoading: isLoadingStatus,
				fetchNextPage: fetchNextPageStatuses,
				hasNextPage: hasNextPageStatuses,
				isFetchingNextPage: isFetchingNextPageStatuses,
				searchParam: searchParam.organizationStatus,
				//
				label: "Статус",
				name: "InstitutionStatusIds",
				type: "list",
				typeValue: "id",
			},
		},
	};
};
