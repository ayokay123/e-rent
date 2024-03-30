import axios from "axios";
const apiAuth = axios.create({ baseURL: "http://localhost:8081/api/v1/auth" });
const fetcher = {
  delete: (url, params) =>
    api.delete(url, { params }).then((res) => res.data),
  get: (url, params) =>
    api.get(url, { params }).then((res) => res.data),
  patch: (url, { arg }) =>
    api.patch<U>(url, arg).then((res) => res.data),
  postAuth: (url, { arg }) =>
  apiAuth.post(url, arg).then((res) => res.data),
};

export { fetcher };
