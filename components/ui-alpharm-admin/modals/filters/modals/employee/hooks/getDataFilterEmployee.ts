


import {
	useGetDictionariesDivisions,
    useGetDictionariesRoles,
    useGetDictionariesTerritories,
} from "@/api/dictionaries";

import { useGetDictionariesEmployPosts } from "@/api/dictionaries/employee-post/get";

import { useState } from "react";


interface IFunctionGetDataFilter {
    isOpen: boolean
}

interface SearchParam {
    divisions?: string;
    territories?: string;
    posts?: string;
    roles?: string;
}

export const getDataFilterEmployee = ({
    isOpen
}: IFunctionGetDataFilter) => {
    const [searchParam, setSearchParam] = useState<SearchParam>({
        divisions: "",
        territories: "",
        posts: "",
        roles: "",
    });

	const {
		items: divisions,
		isLoading: isLoadingDivisions,
		fetchNextPage: fetchNextPageDivisions,
		hasNextPage: hasNextPageDivisions,
		isFetchingNextPage: isFetchingNextPageDivisions,
	} = useGetDictionariesDivisions(searchParam.divisions, isOpen);

	const {
		items: territories,
		isLoading: isLoadingTerritories,
		fetchNextPage: fetchNextPageTerritories,
		hasNextPage: hasNextPageTerritories,
		isFetchingNextPage: isFetchingNextPageTerritories,
	} = useGetDictionariesTerritories(searchParam.territories, isOpen);

	const {
		items: posts,
		isLoading: isLoadingPosts,
		fetchNextPage: fetchNextPagePosts,
		hasNextPage: hasNextPagePosts,
		isFetchingNextPage: isFetchingNextPagePosts,
	} = useGetDictionariesEmployPosts(searchParam.posts, isOpen);

	const {
		items: roles,
		isLoading: isLoadingRoles,
		fetchNextPage: fetchNextPageRoles,
		hasNextPage: hasNextPageRoles,
		isFetchingNextPage: isFetchingNextPageRoles,
	} = useGetDictionariesRoles(searchParam.roles, isOpen);

    return {
        setSearchParam,
       data: {
        divisions: {
            data: divisions,
            isLoading: isLoadingDivisions,
            fetchNextPage: fetchNextPageDivisions,
            hasNextPage: hasNextPageDivisions,
            isFetchingNextPage: isFetchingNextPageDivisions,
            searchParam: searchParam.divisions,
            //
            label: 'Подразделение',
            name: 'Divisions',
            type: 'list',
            typeValue: 'id'
        },
        territories: {
            data: territories,
            isLoading: isLoadingTerritories,
            fetchNextPage: fetchNextPageTerritories,
            hasNextPage: hasNextPageTerritories,
            isFetchingNextPage: isFetchingNextPageTerritories,
            searchParam: searchParam.territories,
            //
            label: 'Территория',
            name: 'Territories',
            type: 'list',
            typeValue: 'id'
        },
        posts: {
            data: posts,
            isLoading: isLoadingPosts,
            fetchNextPage: fetchNextPagePosts,
            hasNextPage: hasNextPagePosts,
            isFetchingNextPage: isFetchingNextPagePosts,
            searchParam: searchParam.posts,
            //
            label: 'Должность',
            name: 'Posts',
            type: 'list',
            typeValue: 'id'
        },
        roles: {
            data: roles,
            isLoading: isLoadingRoles,
            fetchNextPage: fetchNextPageRoles,
            hasNextPage: hasNextPageRoles,
            isFetchingNextPage: isFetchingNextPageRoles,
            searchParam: searchParam.roles,
            //
            label: 'Роль',
            name: 'roles',
            type: 'list',
            typeValue: 'id'
        },
     }
    }
}