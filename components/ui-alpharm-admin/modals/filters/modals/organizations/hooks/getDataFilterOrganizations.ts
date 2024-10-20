import { useEffect, useState } from "react";

import { Filter } from "@/store/filters/organizationFilterStore";

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
	filters: any;
}

interface SearchParam {
	cities: string;
	organizationTypes?: string;
	organizationKinds?: string;
	organizationStatus: string;
	organizationCategory: string;
	targetUsers: string;
	networks: string;
}

export const getDataFilterOrganizations = ({
	isOpen,
	filters,
}: IFunctionGetDataFilter) => {
	const [currentTypeIds, setCurrentTypeIds] = useState();
	const [searchParam, setSearchParam] = useState<SearchParam>({
		cities: "",
		organizationTypes: "",
		organizationKinds: "",
		organizationStatus: "",
		organizationCategory: "",
		targetUsers: "",
		networks: "",
	});

	useEffect(() => {
		setCurrentTypeIds(
			filters.find((item: Filter) => item.name === "InstitutionTypeIds")?.values
		);
	}, [filters]);

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
		fetchNextPage: fetchNextPageOrganizationsTypes,
		hasNextPage: hasNextPageOrganizationsTypes,
		isFetchingNextPage: isFetchingNextPageOrganizationsTypes,
	} = useGetDictionariesOrganizationTypes(
		searchParam.organizationTypes,
		isOpen
	);

	const {
		items: organizationKinds,
		isLoading: isLoadingKinds,
		fetchNextPage: fetchNextPageOrganizationKinds,
		hasNextPage: hasNextPageOrganizationKinds,
		isFetchingNextPage: isFetchingNextPageOrganizationKinds,
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
		fetchNextPage: fetchNextPageOrganizationCategories,
		hasNextPage: hasNextPageOrganizationCategories,
		isFetchingNextPage: isFetchingNextPageOrganizationCategories,
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
	} = useGetDictionariesNetworks(currentTypeIds, searchParam.networks, isOpen);

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
				fetchNextPage: fetchNextPageOrganizationsTypes,
				hasNextPage: hasNextPageOrganizationsTypes,
				isFetchingNextPage: isFetchingNextPageOrganizationsTypes,
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
				fetchNextPage: fetchNextPageOrganizationKinds,
				hasNextPage: hasNextPageOrganizationKinds,
				isFetchingNextPage: isFetchingNextPageOrganizationKinds,
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
				fetchNextPage: fetchNextPageOrganizationCategories,
				hasNextPage: hasNextPageOrganizationCategories,
				isFetchingNextPage: isFetchingNextPageOrganizationCategories,
				searchParam: searchParam.organizationCategory,
				//
				label: "Категории",
				name: "InstitutionCategoryIds",
				type: "list",
				typeValue: "id",
			},
			targetUser: {
				data: undefined,
				isLoading: undefined,
				fetchNextPage: undefined,
				hasNextPage: undefined,
				isFetchingNextPage: undefined,
				searchParam: undefined,
				//
				label: "Таргет",
				name: "TargetUserIds",
				type: "target",
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
