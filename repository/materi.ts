import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  findMaterialByClass: (id:any) => `/material/list/${id}`,
  findMaterialById: (id: any) => `/material/${id}`,
  createMaterial: () => '/material/create-material',
  updateMaterialByClass: (id:any) => `/material/update-material/${id}`
};
const hooks = {
	findMaterialByClass(id:any) {
		return useSWR(url.findMaterialByClass(id), http.fetcher)
	},
  findMaterialById(id: any){
    return useSWR(url.findMaterialById(id), http.fetcher)
  }
}
const manipulateData = {
  createMaterial(data:any){
    return http.post(url.createMaterial()).send(data)
  },
  updateMaterialByClass (data:any, id:any){
    return http.put(url.updateMaterialByClass(id)).send(data);
  }
};

export const materiRepository = {
  url,
  manipulateData,
  hooks
};
