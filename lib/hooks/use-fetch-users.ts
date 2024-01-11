import {userService} from "@/service/user.service";
import {useMutation, useQuery} from "@tanstack/react-query";

const useFetchUsers = () => {
    const query = useQuery({
        queryKey:["users"],
        queryFn: async () => await userService.getUsers()
    })
    return{
        users: query?.data ?? []
    }
}
export default useFetchUsers;
