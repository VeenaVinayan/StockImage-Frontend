import axiosInstance from '../apiStore/api';
import type { TLoginUser, TRegisterFormInput , TLoginResult, TResponseType} from '../types/auth.types';

class AuthService{
    async userRegister(data:TRegisterFormInput): Promise<number>{
        try{
             const res = await axiosInstance.post('/register',data);
             console.log("Usesr registerd ::",res);
             return res.status;
        }catch(err){
            console.log('Error is ',err);
            throw err;
        }
    }
    async userLogin(loginData : TLoginUser):Promise<TLoginResult>{
        try{
            const { data } = await axiosInstance.post('/login',loginData);
            console.log("Login Result ::",data.loginData);
            return data.loginData;
        }catch(err){
            console.log('Error is ::',err);
            throw err;
        }
    }
    async userLogout():Promise<TResponseType>{
         const { data } = await axiosInstance.post(`/logout`);
         return data;
    }
    
}

export default new AuthService();