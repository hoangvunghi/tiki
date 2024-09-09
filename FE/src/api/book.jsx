import axiosClient from "./axios";

const bookApi = {
  getAllBook(){
    const url = '/search/';
    return axiosClient.get(url);
  },
  searchBook(keyword){},
}
 
export default bookApi;