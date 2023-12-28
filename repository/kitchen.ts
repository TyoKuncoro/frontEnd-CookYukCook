import { http } from "#/utils/http"
import useSWR from "swr"

const url = {
    getKitchenById: (id:any) => `/kitchen-studio/users/${id}`,
    getKitchenPending: (status) => `/kitchen-studio/users?status=${status}`
}

const hooks = {
    getKitchenById(id:any){
        return useSWR(url.getKitchenById(id), http.fetcher)
    },
    getKitchenPending(status){
        return useSWR(url.getKitchenPending(status), http.fetcher)
    }
}

export const kitchenRepository = {
    url, 
    hooks
}