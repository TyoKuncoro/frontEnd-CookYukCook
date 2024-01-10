import { http } from "#/utils/http";
import { send } from "process";
import useSWR from "swr";

const url = {
  getTraineeRegStatus: (status: any) => `/users-payment/status?=${status}`,
  getTraineeRegPending: (id: any) => `/users-payment/pending/${id}`,
  getTraineeRegApprove: (id: any) => `/users-payment/approve/${id}`,
};

const hooks = {
  getTraineeRegPending(id: any) {
    return useSWR(url.getTraineeRegPending(id), http.fetcher);
  },
  getTraineeRegApprove(id: any) {
    return useSWR(url.getTraineeRegApprove(id), http.fetcher);
  },
};

const manipulatedData = {

};

export const usersPaymentRepository = {
  hooks,
  url,
  manipulatedData
};
