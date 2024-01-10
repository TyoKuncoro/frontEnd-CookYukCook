import { http } from "#/utils/http";
import { send } from "process";
import useSWR from "swr";

const url = {
  getTraineeRegStatus: (status: any) => `/users-payment/status?=${status}`,
  getTraineeRegPending: (id: any) => `/users-payment/pending/${id}`,
  getTraineeRegApprove: (id: any) => `/users-payment/approve/${id}`,
  getUserPayByRegClass: (id: any) => `/users-payment/regular/${id}`,
  createTraineeReg: () => `/users-payment/booking-regular`,
  updateStatus: (id:any) => `/users-payment/status/${id}`

};

const hooks = {
  getTraineeRegPending(id: any) {
    return useSWR(url.getTraineeRegPending(id), http.fetcher);
  },
  getTraineeRegApprove(id: any) {
    return useSWR(url.getTraineeRegApprove(id), http.fetcher);
  },
  getUserPayByRegClass(id: any) {
    return useSWR(url.getUserPayByRegClass(id), http.fetcher);
  }
};

const manipulatedData = {
    createTraineeReg(data:any){
        return http.post(url.createTraineeReg()).send(data)
    },
    updateStatus(id: any, data:any) {
        return http.put(url.updateStatus(id))
    }
};

export const usersPaymentRepository = {
  hooks,
  url,
  manipulatedData
};
