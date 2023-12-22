import { http } from "#/utils/http"
import useSWR from "swr"

const url = {
    getKitchenById: (id:any) => `/kitchen-studio/users/${id}`
}

const hooks = {
    getKitchenById(id:any){
        return useSWR(url.getKitchenById(id), http.fetcher)
    }
}

export const kitchenRepository = {
    url, 
    hooks
}