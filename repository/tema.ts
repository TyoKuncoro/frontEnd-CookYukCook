import { http } from "#/utils/http";
import { use } from "react";
import useSWR from "swr";

const url = {
    findAllTema: () => "/training-theme",
    createTema: () => "/training-theme"
};
const hooks = {
    findAllTema(){
        return useSWR(url.findAllTema(), http.fetcher)
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
