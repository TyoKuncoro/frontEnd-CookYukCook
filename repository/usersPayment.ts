import { http } from "#/utils/http";
import { send } from "process";
import useSWR from "swr";

const url = {
  getTraineeRegStatus: (status: any) => `/users-payment/status?=${status}`,
  getTraineeRegAllPending: (id: any) => `/users-payment/pending/${id}`,
  getTraineeRegAllApprove: (id: any) => `/users-payment/approve/${id}`,
  getUserPayByRegClass: (id: any) => `/users-payment/regular/${id}`,
  getUserPayById: (id: any) => `/users-payment/${id}`,
  createTraineeReg: () => `/users-payment/booking-regular`,
  updateStatus: (id:any) => `/users-payment/status/${id}`,
  getPengajuanApporve: (id:any) => `/users-payment/approve-pengajuan/${id}`,
  getPengajuanPending: (id:any) => `/users-payment/pending-pengajuan/${id}`

};

const hooks = {
  getTraineeRegPending(id: any) {
    return useSWR(url.getTraineeRegAllPending(id), http.fetcher);
  },
  getTraineeRegApprove(id: any) {
    return useSWR(url.getTraineeRegAllApprove(id), http.fetcher);
  },
  getUserPayByRegClass(id: any) {
    return useSWR(url.getUserPayByRegClass(id), http.fetcher);
  },
  getUserPayById(id: any) {
    return useSWR(url.getUserPayById(id), http.fetcher);
  },
  getPengajuanApprove(id: any) {
    return useSWR(url.getPengajuanApporve(id), http.fetcher);
  },
  getPengajuanPending(id: any) {
    return useSWR(url.getPengajuanPending(id), http.fetcher);
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
