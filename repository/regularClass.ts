import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  findAllRegularClass: () => "/regular-class",
  findRegClassByKitchen: (id:any) => `/regular-class/find/${id}`,
  findRegClassBykitchenPending: (id:any) => `/regular-class/find-pending/${id}`,
  findRegClassById: (id:any) => `/regular-class/${id}`,
  createKelas: () => '/regular-class/create-pengajuan',
  updatePengajuan: (id:any) => `/regular-class/update-pengajuan/${id}`,
  updateBenches: (id: any) => `/regular-class/benches/${id}`
};
const hooks = {
	findAllRegularClass() {
		return useSWR(url.findAllRegularClass(), http.fetcher)
	},
  findRegClassByKitchen(id:any){
    return useSWR(url.findRegClassByKitchen(id), http.fetcher)
  },
  findRegClassById(id:any){
    return useSWR(url.findRegClassById(id), http.fetcher)
  },
  findRegClassByKitchenPending(id:any){
    return useSWR(url.findRegClassBykitchenPending(id), http.fetcher)
  }
}
const manipulateData = {
  createKelasReg(data:any){
    return http.post(url.createKelas()).send(data)
  },
  updatePengajuanKelasReg(id:any, data:any){
    return http.put(url.updatePengajuan(id)).send(data)
  },
  updateBenches(id: any, data: any){
    return http.put(url.updateBenches(id)).send(data)
  }
};

export const regularClassRepository = {
  url,
  manipulateData,
  hooks
};
