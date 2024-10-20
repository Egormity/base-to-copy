

import { useGetDictionariesEmployPosts } from "@/api/dictionaries/employee-post/get";
import {useState } from "react";


interface IFunctionGetDataFilter {
    isOpen: boolean;
}


interface SearchParam {
    employeePosts?: string;
}

export const getDataFilterCompanyStructure = ({
    isOpen
}: IFunctionGetDataFilter) => {
    const [searchParam, setSearchParam] = useState<SearchParam>({
        employeePosts: "",
 
    });

	const {
		items: posts,
		isLoading: isLoadingPosts,
		fetchNextPage: fetchNextPagePosts,
		hasNextPage: hasNextPagePosts,
		isFetchingNextPage: isFetchingNextPagePosts,
	} = useGetDictionariesEmployPosts(searchParam.employeePosts, isOpen);

    return {
        setSearchParam,
       data: {
        employeePosts: {
            data: posts,
            isLoading: isLoadingPosts,
            fetchNextPage: fetchNextPagePosts,
            hasNextPage: hasNextPagePosts,
            isFetchingNextPage: isFetchingNextPagePosts,
            searchParam: searchParam.employeePosts,
            //
            label: 'Должность',
            name: 'postId',
            typeValue: 'id',
            type: 'list'
       
        },
     
       
     }
    }
}