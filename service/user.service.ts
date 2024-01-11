import {http} from "@/utils/http";
import {MessageFormat} from "@/utils/message-format";
import {User} from "@/lib/types";


const ServiceId = {
    USER: '/users',
    GET_BY_ID: '/users/{0}'
}
const getUsers = async () => {
    const result = await http.get(ServiceId.USER + `?pageSize=${100}`,)
    return result?.data
}

async function createUser(requestBody: any) {
    const API = ServiceId.USER;
    return await http.post(API, requestBody).catch(err=> err)
}
async function updateUser(requestBody: any, id:any){
    const API = ServiceId.USER+ `/${id}`;
    return await http.put(API, requestBody).catch(err=> err)
}

async function deleteUser(id:any){
    const API = ServiceId.USER+ `/${id}`;
    return await http.delete(API).catch(err=> err)
}
export const userService = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}