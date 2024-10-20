

import {  useState } from "react";

import { useGetMarketingTargetPanelStatuses } from "@/api/dictionaries/targetpanel-statuses/get";
import { useGetDictionariesTargetGroups } from "@/api/dictionaries";

interface IFunctionGetDataFilter {
    isOpen: boolean;
}

interface SearchParam {
    targetGroups?: string;
    statuses: string;
}

export const getDataFilterPlan = ({
    isOpen,
}: IFunctionGetDataFilter) => {
    const [searchParam, setSearchParam] = useState<SearchParam>({
        targetGroups: "",
        statuses: ""
    });

	const {
		items: statuses,
		isLoading: isLoadingStatuses,
		fetchNextPage: fetchNextPageStatuses,
		hasNextPage: hasNextPageStatuses,
		isFetchingNextPage: isFetchingNextPageStatuses,
	} = useGetMarketingTargetPanelStatuses(searchParam.statuses, isOpen);

	const {
		items: targetGroups,
		isLoading: isLoadingTargetGroups,
		fetchNextPage: fetchNextPageTargetGroups,
		hasNextPage: hasNextPageTargetGroups,
		isFetchingNextPage: isFetchingNextPageTargetGroups,
	} = useGetDictionariesTargetGroups(searchParam.targetGroups, isOpen);

    return {
        setSearchParam,
       data: {
        statuses: {
            data: statuses,
            isLoading: isLoadingStatuses,
            fetchNextPage: fetchNextPageStatuses,
            hasNextPage: hasNextPageStatuses,
            isFetchingNextPage: isFetchingNextPageStatuses,
            //
            isSearchable: false,
            searchParam: searchParam.statuses,
            //
            label: 'Статус',
            name: 'TargetPanelStatusIds',
            type: 'list',
            typeValue: 'id',
        },
        targetGroups: {
            data: targetGroups,
            isLoading: isLoadingTargetGroups,
            fetchNextPage: fetchNextPageTargetGroups,
            hasNextPage: hasNextPageTargetGroups,
            isFetchingNextPage: isFetchingNextPageTargetGroups,
            //
            isSearchable: true,
            searchParam: searchParam.targetGroups,
            //
            label: 'Целевая группа',
            name: 'TargetGroupIds',
            type: 'list',
            typeValue: 'id'
        },
       
     }
    }
}