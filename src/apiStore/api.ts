import axios, { type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance : AxiosInstance = axios.create({
     baseURL:`${URL}`,
     timeout:10000,
     headers: {
        'Content-Type':'application/json',
     },
     withCredentials: true,
});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response) {
            const message = error.response?.data?.message || error.message || "Unexpected error occured"
            console.log('Error is ::',message);
            toast.error(message);    
           }
        }
  )

export default axiosInstance;