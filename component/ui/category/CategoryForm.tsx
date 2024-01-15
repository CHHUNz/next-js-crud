'use client'
import Modal from 'react-bootstrap/Modal';
import {useUserStore} from "@/lib/store/store";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {categoryService} from "@/service/category.service";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
export default function CategoryForm() {
    const query = useQueryClient()
    const {open, setOpen, isUpdate, updateData} = useUserStore();
    const [category, setCategory] = useState(updateData?.name || "");
    const handleSubmit = async () => {
        const body = {
            "name": category
        }

        if (isUpdate){
            const res = await categoryService.updateCategory(body, updateData.id);
            if (res?.status == 200){
                setOpen(false)
                query.invalidateQueries({queryKey: ['categories']})
            }
            return;
        }

        const response = await categoryService.createCategory(body);
        if ((response?.status == 200)){
            setOpen(false)
            query.invalidateQueries({queryKey:['categories']})
        }
    }
    // const mutation = useMutation({
    //     mutationFn: categoryService.createCategory,
    //     onSuccess: ()=> {
    //         setOpen(false)
    //         query.invalidateQueries({queryKey:["categories"]})
    //     }
    // })
    console.log(category)
    return (
        <>
            <Modal show={open} style={{marginTop:"50px"}}>
                <div style={{padding:"25px"}} className=" form-group row g-3 col-form-label-lg d-flex justify-content-center ">
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Category Name</label>
                        <input value={category} onChange={(e:any)=> setCategory(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="category"/>
                    </div>
                    <div className="col-12">
                        <button onClick={()=> setOpen(false)} type="submit" className="btn btn-secondary" >Cancel</button>
                        <button onClick={()=>handleSubmit()} style={{marginLeft:"10px"}} type="submit" className="btn btn-primary">{isUpdate ? "Update" : "Create"}</button>
                        {/*<button*/}
                        {/*    onClick={()=>{*/}
                        {/*        mutation.mutate({*/}
                        {/*            name: category*/}
                        {/*        })*/}
                        {/*    }}*/}
                        {/*    style={{marginLeft:"10px"}} type="submit" className="btn btn-primary">{isUpdate ? "Update" : "Create"}</button>*/}
                    </div>
                </div>

            </Modal>
        </>
    )
}