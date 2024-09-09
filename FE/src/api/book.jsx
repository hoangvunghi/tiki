import axiosClient from "./axios";

const bookApi = {
  getAllBook(){
    const url = '/search/';
    return axiosClient.get(url);
  },
  getDetailBook(id){
    const url = `/book/${id}`;
    return axiosClient.get(url);
  },
}
 
export default bookApi;