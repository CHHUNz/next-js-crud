import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userService} from "@/service/user.service";
import {useUserStore} from "@/lib/store/store";

interface props {
    onClose: () => void
}
export default function UserForm() {
    const {open, setOpen, updateData, isUpdate} = useUserStore(state => state)
    const [username, setUsername] = useState(updateData?.username || "");
    const [role, setRole] = useState(updateData?.role || "");
    const queryClient = useQueryClient()

    //create
    // const createMultiBill = useMutation( async (data:any) => await userService.createUser(data), {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({queryKey: ['users']})
    //         onClose()
    //     },
    // })
    const handleSubmit= async () => {
        const body =
            {
                "name": username,
                "role": role
            }

        if (isUpdate) {
            const response = await userService.updateUser(body, updateData.userId);
            if (response?.status == 200) {
                setOpen(false)
                queryClient.invalidateQueries({queryKey: ['users']})
            }
            return;
        }

        const response = await userService.createUser(body);
        if (response?.status == 200) {
            setOpen(false)
            queryClient.invalidateQueries({queryKey: ['users']})
        }

    }

    return (
        <>
            <Modal show={open} style={{marginTop:"50px"}}>
                <div style={{padding:"25px"}} className=" form-group row g-3 col-form-label-lg d-flex justify-content-center ">
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Username</label>
                        <input value={username}  onChange={(e:any) =>{setUsername(e.target.value)}}    type="text" className="form-control" id="inputAddress" placeholder="username"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Role</label>
                        <input value={role} onChange={(e:any)=> (setRole(e.target.value))} type="text" className="form-control" id="inputAddress2"
                               placeholder="role"/>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
                        <button onClick={() => handleSubmit()} style={{marginLeft:"10px"}} type="submit" className="btn btn-primary">{isUpdate ? "Update" : "Save"}</button>
                    </div>
                </div>

            </Modal>
        </>
    )
}