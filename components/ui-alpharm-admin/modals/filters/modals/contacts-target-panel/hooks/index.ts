


import { useGetTargetGroups } from "@/api/commons";
import {
	useGetDictionariesCities,
	useGetDictionariesContactCategories,
	useGetDictionariesContactStatus,
	useGetDictionariesOrganizations,
} from "@/api/dictionaries";
import { useGetDictionariesContactTypes } from "@/api/dictionaries/contact-types/get";
import { useGetDictionariesSpecializations } from "@/api/dictionaries/specializations/get";
import { useState } from "react";


interface IFunctionGetDataFilter {
    isOpen: boolean
}

interface SearchParam {
    targetGroups?: string;
    contactTypes?: string;
    specializations?: string;
    contactCategories?: string;
    placesWorks?: string;
    statuses?: string;
    cities?: string;
}

export const getDataFilterContacts = ({
    isOpen
}: IFunctionGetDataFilter) => {


    const [searchParam, setSearchParam] = useState<SearchParam>({
        targetGroups: "",
        contactTypes: "",
        specializations: "",
        placesWorks: "",
        statuses: "",
        contactCategories: ""
    });

	const {
		items: targetGroups,
		isLoading: isLoadingTargetGroups,
		fetchNextPage: fetchNextPageTargetGroups,
		hasNextPage: hasNextPageTargetGroups,
		isFetchingNextPage: isFetchingNextPageTargetGroups,
	} = useGetTargetGroups(searchParam.targetGroups, isOpen);

	const {
		items: contactTypes,
		isLoading: isLoadingContactTypes,
		fetchNextPage: fetchNextPageContactTypes,
		hasNextPage: hasNextPageContactTypes,
		isFetchingNextPage: isFetchingNextPageContactTypes,
	} = useGetDictionariesContactTypes(searchParam.contactTypes, isOpen);

	const {
		items: specializations,
		isLoading: isLoadingSpecialization,
		fetchNextPage: fetchNextPageSpecialization,
		hasNextPage: hasNextPageSpecialization,
		isFetchingNextPage: isFetchingNextPageSpecialization,
	} = useGetDictionariesSpecializations(searchParam.specializations, isOpen);

	const {
		items: placesWorks,
		isLoading: isLoadingOrganizations,
		fetchNextPage: fetchNextPageOrganizations,
		hasNextPage: hasNextPageOrganizations,
		isFetchingNextPage: isFetchingNextPageOrganizations,
	} = useGetDictionariesOrganizations(searchParam.placesWorks, undefined, isOpen);

    
	const {
		items: status,
		isLoading: isLoadingStatus,
		fetchNextPage: fetchNextPageStatuses,
		hasNextPage: hasNextPageStatuses,
		isFetchingNextPage: isFetchingNextPageStatuses,
	} = useGetDictionariesContactStatus(searchParam.statuses, isOpen);

    
	const {
		items: cities,
		isLoading: isLoadingCities,
		fetchNextPage: fetchNextPageCities,
		hasNextPage: hasNextPageCities,
		isFetchingNextPage: isFetchingNextPageCities,
	} = useGetDictionariesCities(searchParam.cities, isOpen);


	const {
		items: category,
		isLoading: isLoadingCategory,
		fetchNextPage: fetchNextPageContactCategories,
		hasNextPage: hasNextPageContactCategories,
		isFetchingNextPage: isFetchingNextPageContactCategories,
	} = useGetDictionariesContactCategories(searchParam.contactCategories, isOpen);

    return {
        setSearchParam,
       data: {
        targetGroups: {
            data: targetGroups,
            isLoading: isLoadingTargetGroups,
            fetchNextPage: fetchNextPageTargetGroups,
            hasNextPage: hasNextPageTargetGroups,
            isFetchingNextPage: isFetchingNextPageTargetGroups,
            searchParam: searchParam.targetGroups,
            //
            label: 'Целевая группа',
            name: 'TargetGroupIds',
            type: 'list',
            typeValue: 'id'
        },
        contactTypes: {
            data: contactTypes,
            isLoading: isLoadingContactTypes,
            fetchNextPage: fetchNextPageContactTypes,
            hasNextPage: hasNextPageContactTypes,
            isFetchingNextPage: isFetchingNextPageContactTypes,
            searchParam: searchParam.contactTypes,
            //
            label: 'Тип контакта',
            name: 'ContactTypeIds',
            type: 'list',
            typeValue: 'id'
        },
        specializations: {
            data: specializations,
            isLoading: isLoadingSpecialization,
            fetchNextPage: fetchNextPageSpecialization,
            hasNextPage: hasNextPageSpecialization,
            isFetchingNextPage: isFetchingNextPageSpecialization,
            searchParam: searchParam.specializations,
            //
            label: 'Специализации',
            name: 'SpecialityIds',
            type: 'list',
            typeValue: 'id'
        },
        placesWorks: {
            data: placesWorks,
            isLoading: isLoadingOrganizations,
            fetchNextPage: fetchNextPageOrganizations,
            hasNextPage: hasNextPageOrganizations,
            isFetchingNextPage: isFetchingNextPageOrganizations,
            searchParam: searchParam.placesWorks,
            //
            label: 'Место работы',
            name: 'InstitutionIds',
            type: 'list',
        },
        targetUser: {
            data: undefined,
            isLoading: undefined,
            fetchNextPage: undefined,
            hasNextPage: undefined,
            isFetchingNextPage: undefined,
            searchParam: undefined,
            //
            label: 'Таргет',
            name: 'TargetUserIds',
            type: 'target',
            typeValue: 'id'
        },
        
        status: {
            data: status,
            isLoading: isLoadingStatus,
            fetchNextPage: fetchNextPageStatuses,
            hasNextPage: hasNextPageStatuses,
            isFetchingNextPage: isFetchingNextPageStatuses,
            searchParam: searchParam.statuses,
            //
            label: 'Статус',
            name: 'StatusIds',
            type: 'list',
            typeValue: 'id'
        },
        contactCategories: {
            data: category,
            isLoading: isLoadingCategory,
            fetchNextPage: fetchNextPageContactCategories,
            hasNextPage: hasNextPageContactCategories,
            isFetchingNextPage: isFetchingNextPageContactCategories,
            searchParam: searchParam.contactCategories,
            //
            label: 'Категория',
            name: 'ContactWorkplaceCategoryIds',
            type: 'list',
            typeValue: 'id'
        },
        cities: {
            data: cities,
            isLoading: isLoadingCities,
            fetchNextPage: fetchNextPageCities,
            hasNextPage: hasNextPageCities,
            isFetchingNextPage: isFetchingNextPageCities,
            searchParam: searchParam.cities,
            //
            label: 'Населенный пункт',
            name: 'City',
            type: 'list',
            typeValue: 'id'
        },
     }
    }
}