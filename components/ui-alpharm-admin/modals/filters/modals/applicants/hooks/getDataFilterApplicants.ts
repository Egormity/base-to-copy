
import { useGetDictionariesCompanyUsers } from "@/api/dictionaries/company-users/get";
import { useGetDictionariesRequestStatuses } from "@/api/dictionaries/request-statuses/get";
import { useGetDictionariesRequestTypes } from "@/api/dictionaries/request-types/get";

import {useState } from "react";


interface IFunctionGetDataFilter {
    isOpen: boolean;
}


interface SearchParam {
    applicantsTypes?: string;
    applicantsStatuses?: string;
    applicantsAuthors?: string;

}

export const getDataFilterApplicants = ({
    isOpen
}: IFunctionGetDataFilter) => {
    const [searchParam, setSearchParam] = useState<SearchParam>({
        applicantsTypes: "",
        applicantsStatuses: "",
        applicantsAuthors: ""
    });

	const {
		items: types,
		isLoading: isLoadingTypes,
		fetchNextPage: fetchNextPageRequestsTypes,
		hasNextPage: hasNextPageRequestsTypes,
		isFetchingNextPage: isFetchingNextPageRequestsTypes,
	} = useGetDictionariesRequestTypes(undefined, isOpen);

	const {
		items: statuses,
		isLoading: isLoadingStatuses,
		fetchNextPage: fetchNextPageStatuses,
		hasNextPage: hasNextPageStatuses,
		isFetchingNextPage: isFetchingNextPageStatuses,
	} = useGetDictionariesRequestStatuses(undefined, isOpen);

	const {
		items: users,
		isLoading: isLoadingUsers,
		fetchNextPage: fetchNextPageCompanyUsers,
		hasNextPage: hasNextPageCompanyUsers,
		isFetchingNextPage: isFetchingNextPageCompanyUsers,
	} = useGetDictionariesCompanyUsers(searchParam.applicantsAuthors, isOpen);

    return {
        setSearchParam,
       data: {
        applicantsTypes: {
            data: types,
            isLoading: isLoadingTypes,
            fetchNextPage: fetchNextPageRequestsTypes,
            hasNextPage: hasNextPageRequestsTypes,
            isFetchingNextPage: isFetchingNextPageRequestsTypes,
            searchParam: searchParam.applicantsTypes,
            //
            label: 'Тип заявки',
            name: 'TypeIds',
            typeValue: 'id',
            type: 'list'
       
        },
        applicantsStatuses: {
            data: statuses,
            isLoading: isLoadingStatuses,
            fetchNextPage: fetchNextPageStatuses,
            hasNextPage: hasNextPageStatuses,
            isFetchingNextPage: isFetchingNextPageStatuses,
            searchParam: searchParam.applicantsStatuses,
            //
            label: 'Статус',
            name: 'StatusIds',
            type: 'list',
            typeValue: 'id'
        },
        applicantsAuthors: {
            data: users,
            isLoading: isLoadingUsers,
            fetchNextPage: fetchNextPageCompanyUsers,
            hasNextPage: hasNextPageCompanyUsers,
            isFetchingNextPage: isFetchingNextPageCompanyUsers,
            searchParam: searchParam.applicantsAuthors,
            //
            label: 'Автор заявки',
            name: 'UserId',
            type: 'list',
            typeValue: 'id'
        },
       
     }
    }
}