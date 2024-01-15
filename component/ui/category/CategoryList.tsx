"use client"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryForm from "@/component/ui/category/CategoryForm";
import {useUserStore} from "@/lib/store/store";
import useFetchCategory from "@/lib/hooks/use-fetch-category";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {categoryService} from "@/service/category.service";

const CategoryList = () => {
    const query = useQueryClient();
    const {categories} = useFetchCategory();
    const {open, setOpen, setIsUpdate, setUpdateData} = useUserStore();
    console.log(categories.payload)
    const handleDelete = async (id:any) => {
        const response = await categoryService.deleteCategory(id);
        if (response?.status == 200) {
            query.invalidateQueries({queryKey: ['categories']})
        }
    }
    return (
        <div className="pt-10">
            <div className="w-75 mx-auto pt-lg-5">
                <button type="button" className="btn btn-success mb-lg-2"
                        onClick={() => {
                            setOpen(true)
                        }}>
                    Create Category
                </button>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.payload?.map((category: any, index: any) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{category.name}</td>
                            <td>
                                <button type="button" className="btn btn-primary " onClick={() => {
                                    setOpen(true)
                                    setIsUpdate(true)
                                    setUpdateData(category)
                                }}>
                                    Update
                                </button>
                                <button onClick={() => handleDelete(category.id)} type="button"
                                        className="btn btn-danger"
                                        style={{marginLeft: '15px'}}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {
                open && <CategoryForm/>
            }
        </div>
    )
}

export default CategoryList