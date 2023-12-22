import { http } from "#/utils/http";
import { use } from "react";
import useSWR from "swr";

const url = {
    findAllTema: () => "/training-theme",
    createTema: () => "/training-theme",
    findTemaByUsers: (id:any) => `/training-theme/${id}`
};
const hooks = {
    findAllTema(){
        return useSWR(url.findAllTema(), http.fetcher)
    },
    findTemaByUsers(id:any){
        return useSWR(url.findTemaByUsers(id), http.fetcher)
    }
}
const manipulateData = {
    createTema(data:any){
        return http.post(url.createTema()).send(data)
    }
};

export const temaKelasRepository = {
  url,
  manipulateData,
  hooks
};
