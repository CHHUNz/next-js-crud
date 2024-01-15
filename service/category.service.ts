import {http} from "@/utils/http";

const ServiceId = {
    CATEGORY: '/categories'
}
const getAllCategory = async () => {
    const result = await http.get(ServiceId.CATEGORY)
    return result?.data
}
async function deleteCategory(id:any){
    const API = ServiceId.CATEGORY + `/${id}`;
    return await http.delete(API).catch(error => error)
}

async function createCategory (requestBody:any){
    const API = ServiceId.CATEGORY;
    return await http.post(API, requestBody).catch(error => error)
}

async function updateCategory(requestBody:any, id:any){
    const API = ServiceId.CATEGORY + `/${id}`;
    return await http.put(API, requestBody).catch(err => err);
}
export const categoryService = {
    getAllCategory,
    createCategory,
    deleteCategory,
    updateCategory
}