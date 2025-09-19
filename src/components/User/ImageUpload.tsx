import React , { useState }from 'react'
import { type TImageUpload } from '../../types/image.types';
import { Upload } from 'lucide-react';
import ImageService from '../../services/imageService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface ImageUploadProps{
   userId: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ userId }) => {
    const [images, setImages] = useState<TImageUpload[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleTitle = (index: number, value : string) =>{
        setImages((prev) =>
          prev.map((img,i) => ( i===index ? { ...img,title:value}: img)) 
        )
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
       if(!e.target.files) return;
    
       const newFiles = Array.from(e.target.files).map((file, i) =>({
           file,
           title: '',
           preview: URL.createObjectURL(file),
           order: images.length + i,
       }))
       setImages((prev) => [...prev, ...newFiles]);
    }
    
      const handleUpload = async(e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         setLoading(true);
         const formData = new FormData();
    
         const files =  images.map((image) => image.file);
         const titles = images.map((image) => image.title);
         const orders = images.map((image) => image.order);
    
         files.forEach((file) => formData.append("images",file));
              
         formData.append("titles",JSON.stringify(titles));
         formData.append("orders",JSON.stringify(orders));
         formData.append('userId',userId);
    
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
         const res = await ImageService.uploadImages(formData);
         if(res){
              toast.success("Successfully upload images");
              navigate(-1)
         }else{
              toast.error("Upload images failed");
         }
     };
  return (
    <div>
        { images.length > 0 && (  
         <>
         <h2 className="heading2">Uploaded Images</h2>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((src,idx) => (
                <div
                  key={idx}
                  className="flex flex-col relative overflow-hidden rounded-xl shadow-md group"
                >
                  <img
                    src={src.preview}
                    alt={src.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
                  />
                  <input type="text" 
                               value={src.title}
                               onChange={(e) =>handleTitle(idx,e.target.value)}
                               placeholder='Enter title'
                               className="p-2 mt-1 border-amber-200 rounded"
                               required
                             
                   />
               </div>
             ) ) }
            </div>
            </>  
          ) }
      <div className="flex justify-center">
        <form onSubmit={handleUpload} encType="multipart/form-data">
        
          <label className="btn">
            <Upload size={18} />
              Upload Images
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
          />
          </label>
        
          {images.length > 0 && 
          <div className="flex flex-row p-3 m-2">
             <button type='submit' className="btn">{ loading ? "Uploading ..." : "Save"}</button>
             <button type='reset' >Cancel</button>
          </div>   
          }
         </form>    
        </div>
    </div>
  )
}

export default ImageUpload
