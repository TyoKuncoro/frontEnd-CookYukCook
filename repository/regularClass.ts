import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  findAllRegularClass: () => "/regular-class",

};
const hooks = {
	findAllRegularClass() {
		return useSWR(url.findAllRegularClass(), http.fetcher)
	}
}
const manipulateData = {
};

export const authRepository = {
  url,
  manipulateData,
  hooks
};
