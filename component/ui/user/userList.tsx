"use client"
import React, {useState} from 'react';
import useFetchUsers from "@/lib/hooks/use-fetch-users";
import Link from "next/link";
import UserForm from "@/component/ui/user/UserForm";
import {useUserStore} from "@/lib/store/store";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {userService} from "@/service/user.service";
import {any} from "prop-types";
const UserList = () => {
    const {users} = useFetchUsers();
    const queryClient = useQueryClient()
    const {open,setOpen, setIsUpdate, setUpdateData} = useUserStore(state => state)
    const handleDelete = async (id:any) =>{
        const response = await userService.deleteUser(id);
        if (response?.status == 200) {
            setOpen(false)
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    }

    return (
        <>
        <div style={{marginLeft:"50px"}}>

            <button onClick={()=> {
                setOpen(true)
                setUpdateData("")
                setIsUpdate(false)
            }
            } type="button" style={{marginTop:"100px",background:"blue",color:"white",padding:"5px 20px"}}>New</button>

            <table className="table" style={{marginTop:"10px", width:"800px"}}>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col" >Handle</th>
                </tr>
                </thead>
                <tbody>
                {users.payload?.map((user: any, index: any) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                            <div>
                                <button type="submit" className="btn btn-warning" onClick={() => {
                                    setOpen(true)
                                    setIsUpdate(true)
                                    setUpdateData(user)
                                }}>
                                    Update
                                </button>
                                <button style={{marginLeft:'15px'}} type="submit" className="btn btn-danger" onClick={()=>{
                                    handleDelete(user.userId)
                                }}>
                                    Delete
                                </button>

                            </div>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
            {
                open && <UserForm/>
            }
        </>

    );
};

export default UserList;