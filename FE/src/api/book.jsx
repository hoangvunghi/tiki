import axiosClient from "./axios";

const bookApi = {
  getAllBook(params) {
    const url = '/search/';
    return axiosClient.get(url, {params});
  },
  getDetailBook(id) {
    const url = `/book/${id}`;
    return axiosClient.get(url);
  },
}

export default bookApi;
