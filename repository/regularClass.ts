import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  findAllRegularClass: () => "/regular-class",
  findRegClassByKitchen: (id) => `/regular-class/find/${id}`,
  findRegClassById: (id) => `/regular-class/${id}`,
  createKelas: () => '/regular-class/create-pengajuan'
};
const hooks = {
	findAllRegularClass() {
		return useSWR(url.findAllRegularClass(), http.fetcher)
	},
  findRegClassByKitchen(id){
    return useSWR(url.findRegClassByKitchen(id), http.fetcher)
  },
  findRegClassById(id){
    return useSWR(url.findRegClassById(id), http.fetcher)
  }
}
const manipulateData = {
  createKelasReg(data:any){
    return http.post(url.createKelas()).send(data)
  }
};

export const regularClassRepository = {
  url,
  manipulateData,
  hooks
};
