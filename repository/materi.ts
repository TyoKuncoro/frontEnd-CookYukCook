import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  findMaterialByClass: (id:any) => `/material/list/${id}`,
  createMaterial: () => '/material/create-material'
};
const hooks = {
	findMaterialByClass(id:any) {
		return useSWR(url.findMaterialByClass(id), http.fetcher)
	}
}
const manipulateData = {
  createMaterial(data:any){
    return http.post(url.createMaterial()).send(data)
  }
};

export const materiRepository = {
  url,
  manipulateData,
  hooks
};
