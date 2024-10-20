


import {
	useGetDictionariesDivisions,
} from "@/api/dictionaries";
import { useGetMarketingCycleStatuses } from "@/api/dictionaries/marketingcycle-statuses/get";


import { useState } from "react";


interface IFunctionGetDataFilter {
    isOpen: boolean
}

interface SearchParam {
    divisions?: string;
    statuses?: string;

}

export const useGetDataFilterMarketingCycle = ({
    isOpen
}: IFunctionGetDataFilter) => {
    const [searchParam, setSearchParam] = useState<SearchParam>({
        divisions: "",
        statuses: "",
    });

	const {
		items: divisions,
		isLoading: isLoadingDivisions,
		fetchNextPage: fetchNextPageDivisions,
		hasNextPage: hasNextPageDivisions,
		isFetchingNextPage: isFetchingNextPageDivisions,
	} = useGetDictionariesDivisions(searchParam.divisions, isOpen);



	const { items: statuses, 
        isLoading: isLoadingStatuses, 
        fetchNextPage: fetchNextPageStatuses, 
        hasNextPage: hasNextPageStatuses, 
        isFetchingNextPage: isFetchingNextPageStatuses 
    } = useGetMarketingCycleStatuses(searchParam.statuses, isOpen);


    return {
        setSearchParam,
       data: {
        statuses: {
            data: statuses,
            isLoading: isLoadingStatuses,
            fetchNextPage: fetchNextPageStatuses,
            hasNextPage: hasNextPageStatuses,
            isFetchingNextPage: isFetchingNextPageStatuses,
            searchParam: searchParam.statuses,
            isSearchable: false,
            //
            label: 'Статус',
            name: 'StatusIds',
            type: 'list',
            typeValue: 'id'
        },
        divisions: {
            data: divisions,
            isLoading: isLoadingDivisions,
            fetchNextPage: fetchNextPageDivisions,
            hasNextPage: hasNextPageDivisions,
            isFetchingNextPage: isFetchingNextPageDivisions,
            searchParam: searchParam.divisions,
            isSearchable: true,
            //
            label: 'Подразделение',
            name: 'DivisionIds',
            type: 'list',
            typeValue: 'id'
      },
     }
    }
}