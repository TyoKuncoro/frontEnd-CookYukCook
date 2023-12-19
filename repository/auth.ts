import { http } from "#/utils/http";

const url = {
  login: () => "/auth/login",
  register: () => "/auth/reg",
  uploadLegalitas: () => "/kitchen-studio/upload-legalitas",
  uploadPhotoTrainee: () => "/users/upload",
  uploadLogo: () => "/kitchen-studio/upload-logo",
};

const manipulateData = {
  login(data: any) {
    return http.post(url.login()).send(data);
  },
  register(data: any) {
    return http.post(url.register()).send(data);
  },
  uploadLegalitas(data: any) {
    const formData = new FormData();
    formData.append("file", data);
    return http.post(url.uploadLegalitas()).send(formData);
  },
  uploadPhotoTrainee(data: any) {
    const formData = new FormData();
    formData.append("file", data);
    return http.post(url.uploadPhotoTrainee()).send(formData);
  },
  uploadLogo(data: any) {
    const formData = new FormData();
    formData.append("file", data);
    return http.post(url.uploadLogo()).send(formData);
  }
};

export const authRepository = {
  url,
  manipulateData,
};
