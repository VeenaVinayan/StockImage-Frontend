import axiosInstance from '../apiStore/userApi';
import {type  TImage } from '../types/image.types';
import { type TResetPassword , type TResponseType } from '../types/auth.types';

class ImageService{
    async uploadImages(formData : FormData):Promise<boolean>{
        try{
             const { data } = await axiosInstance.post('/image/uploads',formData);
             if(data.success) return true;
             else return false;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    async fetchImages(userId : string) : Promise<TImage[]>{
        try{
            console.log("User Id ::",userId);
            const { data } = await axiosInstance.get(`/image/images/${userId}`);
            console.log("Values ::",data.images)
            return data.images;
        }catch(err){
             console.log('Error occured ::',err);
             throw err;
        }
     }
    async deleteImage(imageId : string):Promise<string>{
        try{
             console.log("User Id ::",imageId);
             const { data } = await axiosInstance.delete(`/image/images/${imageId}`);
             return data.message
        }catch(err){
            console.log("Error occured ! ");
            throw err;
        }
    }
    async editImage(formData : FormData,imageId : string):Promise<TImage>{
        try{
            console.log("Data before upload = ",imageId)
            const { data} = await axiosInstance.patch(`/image/images/${imageId}`,formData);
            return data.image;
        }catch(err){
             console.log(err);
             throw err;
        }
    }
    async saveOrderChanges(images: TImage[]):Promise<boolean>{
        const { data } = await axiosInstance.patch(`/image/image-order`,{images});
        return data.success;
    }
    async resetPassword(formData : TResetPassword):Promise<TResponseType>{
        console.log("Reset password Data ::",formData);
        const { data } = await axiosInstance.patch(`/image/reset-password`,formData);
        return data;
    }
    }
export default new ImageService;
