import { http } from "#/utils/http"; 
import { send } from "process";
import useSWR from "swr";


const url = {
    getTraineeRegStatus: (status: any) => `/users-payment/status?=${status}`,
    getTraineeRegPending: (id: any) => `/users-payment/pending/${id}`
}


const hooks = {
    getTraineeRegPending(id: any){
        return useSWR(url.getTraineeRegPending(id), http.fetcher)
    }
}

export const usersPaymentRepository = {
    hooks,
    url
}