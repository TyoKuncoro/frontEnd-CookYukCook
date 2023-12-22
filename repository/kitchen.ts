import { http } from "#/utils/http"
import useSWR from "swr"

const url = {
    getKitchenById: (id:any) => `/kitchen-studio/users/${id}`,
    getKitchenByUser: () => `/kitchen-studio/user`
}

const hooks = {
    getKitchenById(id:any){
        return useSWR(url.getKitchenById(id), http.fetcher)
    },
    getKitchenByUser(){
        return useSWR(url.getKitchenByUser(), http.fetcher)
    },
    
}

export const kitchenRepository = {
    url, 
    hooks
}