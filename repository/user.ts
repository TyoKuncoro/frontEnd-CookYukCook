import { http } from "#/utils/http"
import { send } from "process"
import useSWR from "swr"

const url = {
    getAllUser: () => "/users",
    updatePassword: (id:any) => `/users/password/${id}`,
    updateUsers: (id:any) => `/users/${id}`,
    getUsersById: (id:any) => `/users/${id}`,
    approveKitchen: (id:any) => `/users/approve/${id}`,
    rejectKitchen: (id:any) => `/users/reject/${id}`
}

const hooks = {
    useGetAllUsers(){
        return useSWR(url.getAllUser(), http.fetcher)
    },
    getUsersById (id: any){
        return useSWR(url.getUsersById(id), http.fetcher)
    }
},

manipulatedData= {
    updatePassword(id: any, data:any){
        return http.put(url.updatePassword(id)).send(data)
    },
    updateUsers(id:any, data:any){
        return http.put(url.updateUsers(id)).send(data)
    },
    approveKitchen(id:any){
        return http.put(url.approveKitchen(id))
    },
    rejectKitchen(id:any, data:any){
        return http.put(url.rejectKitchen(id)).send(data)
    }
}

export const usersRepository = {
    hooks,
    manipulatedData,
    url, 
}