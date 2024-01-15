import {useQuery} from "@tanstack/react-query";
import {categoryService} from "@/service/category.service";

const useFetchCategory =  () => {
    const query = useQuery({
        queryKey:['categories'],
        queryFn: async async => await categoryService.getAllCategory()
    })
    return {
        categories: query?.data ?? []
    }
}
export default useFetchCategory;