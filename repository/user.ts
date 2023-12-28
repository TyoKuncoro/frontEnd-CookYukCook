import { http } from "#/utils/http"
import useSWR from "swr"

const url = {
    getAllUser: () => "/users",
    updatePassword: (id:any) => `/users/password/${id}`,
    updateUsers: (id:any) => `/users/${id}`,
    getUsersById: (id:any) => `/users/${id}`
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
    }
}

export const usersRepository = {
    manipulatedData,
    url, 
    hooks
}