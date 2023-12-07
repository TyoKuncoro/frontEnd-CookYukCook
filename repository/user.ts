import { http } from "#/utils/http"
import useSWR from "swr"

const url = {
    getAllUser: () => "/users"
}

const hooks = {
    useGetAllUsers(){
        return useSWR(url.getAllUser(), http.fetcher)
    }
}

export const usersRepository = {
    url, 
    hooks
}