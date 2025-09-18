import  axios , {type  AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const BASE_URL =import.meta.env.VITE_APP_BASE_URL;

const axiosInstance : AxiosInstance = axios.create({
     baseURL:`${BASE_URL}`,
        timeout:10000,
        withCredentials: true,
});
axiosInstance.interceptors.request.use((config) =>{
     const token= localStorage.getItem("accessToken");
     if(token && config.headers){
         config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;
        const status = error.response?.status;
        if(status === 401 && !originalRequest._retry){
               originalRequest._retry = true;
              try{
                  const {  data } = await axios.post(
                    `${BASE_URL}/refresh`,
                    {},
                    { withCredentials : true}
                );
                localStorage.setItem('accessToken',data.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
               }catch(refreshError){
                  console.error('Refresh Token expires or invalid');
                  localStorage.removeItem('accessToken');
                  window.localStorage.href='/login';
                  return Promise.reject(refreshError);
               }
           }
        if(error.response){
            const message = error.response?.data?.message || error.message || "Unexpected error occured"
            console.log('Error is ::',message);
            toast.error(message);
        }
    }
)

export default axiosInstance;