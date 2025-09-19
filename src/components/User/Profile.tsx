import { useState, useEffect, useContext } from "react";
import { Pencil,Trash2,User,Mail,Phone,LogIn} from "lucide-react";
import { useLocation } from "react-router-dom";
import { type TResetPassword, type TResponseType, type TUserData } from "../../types/auth.types";
import { type TImage } from "../../types/image.types";
import ImageService from "../../services/imageService";
import ImageUpload from "./ImageUpload";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Modal from "../Modal";
import EditImage from "./EditImage";
import { DndProvider } from "react-dnd";
import { HTML5Backend} from 'react-dnd-html5-backend';
import ImageCard  from "./DragAndDrop";
import authService from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import ResetPassword from "../Auth/ResetPassword";
import { AuthContext } from "../../Contexxt/authContext";

export default function ProfilePage() {
  const [uploaded, setUploaded] = useState<TImage[]>([]);
  const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/uploads/`;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [ isChange, setOrderChange] = useState<boolean>(false);
  const [ isResetPassword, setResetPassword] = useState<boolean>(false);

  const context = useContext(AuthContext);
  const [editImage, setEditImage] = useState<{
    id: string;
    image: string;
    title: string;
  }>({
    id: "",
    image: "",
    title: "",
  });
  const [user, setUser] = useState<TUserData>({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  useEffect(() => {
    setUser(userData);
    const fetchData = async () => {
      const uploadedImages = await ImageService.fetchImages(userData.id);
      setUploaded(uploadedImages);
    };
    fetchData();
  }, [userData]);

  const handleEdit = (image: TImage) => {
    Swal.fire({
      title: "Edit Image?",
      text: "You can update the title or replace the image.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setModalOpen(true);
        setEditImage({ id: image._id, image: image.image, title: image.title });
      }
    });
  };

  const handleDelete = async (imageId: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await ImageService.deleteImage(imageId);
          if (res) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setUploaded((prev) => prev.filter((img) => img._id !== imageId));
          } else {
            toast.error("Failed to delete image");
          }
        }
      });
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
    }
  };
  const handleImageSave = async (file: File, value: string) => {
    setModalOpen(false);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", JSON.stringify(value));
    const res = await ImageService.editImage(formData, editImage.id);
    setUploaded((prev) =>
      prev.map((val) => (val._id === editImage.id ? res : val))
    );
  };
 const moveImage = (from : number, to : number) =>{
    const updated = [...uploaded];
    const [moved] = updated.splice(from,1);
    updated.splice(to,0,moved);
    setOrderChange(true);
    setUploaded(updated);
 }
 const handelChange = async () =>{
     const updated = uploaded.map((image,index) =>({...image, order: index+1}));
     console.log("New order of Images ::",updated);
    const res = await ImageService.saveOrderChanges(updated);
    if(res){
       setOrderChange(false);
       toast.success("Successfully change order");
    }
 }
 const handleLogout = async () =>{
   const res : TResponseType = await authService.userLogout();
   if(res.success){
      localStorage.removeItem('accessToken');
      context?.logout();
      toast.success(res.message);
      navigate('/');
   }
 }
 const handleResetPassword = () => {
    setResetPassword(true);
 }
 const handleReset = async (data : TResetPassword) =>{
     console.log(data);
     setResetPassword(false);
     const res : TResponseType  = await ImageService.resetPassword(data);
     if(res.success)  toast.success(res.message);
     else toast.error(res.message);
 }
  return (
    <DndProvider backend={HTML5Backend} >
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-700">StockStack</h1>
        <div className="flex items-center space-x-2 text-gray-700">
          <LogIn size={20} className="text-teal-700" onClick={handleLogout} />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b pb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-teal-100">
            <User size={40} className="text-teal-700" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">Member since 2025</p>
          </div>
          <div>
            <button onClick={handleResetPassword} className="absolute top-30 right-90 text-sm text-teal-600 hover:text-teal-800 underline">Reset password</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="text-teal-700" />
            <span className="text-gray-700 font-medium">{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-teal-700" />
            <span className="text-gray-700 font-medium">{user.phone}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 px-6 rounded-2xl justify-center bg-gray-50">
        {uploaded.length > 0 ? (
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 ">Explore Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {uploaded.map((image,index) => (
                <div
                  key={image._id}
                  className="relative group rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-xl transition duration-300"
                >
                  <ImageCard
                      key={image._id}
                      image={image}
                      index={index}
                      moveImage={moveImage}
                      baseUrl={`${baseUrl}${image.image}`}
                  />
               
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(image)}
                      className="p-2 bg-white rounded-full shadow hover:bg-teal-600 hover:text-white transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="p-2 bg-white rounded-full shadow hover:bg-red-600 hover:text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
           
              ))}
      
            </div>
            { isChange && (<button className="btn justify-end m-5" onClick={handelChange}>Save</button>)}
          </div>
        ) : (
          <ImageUpload userId={user.id} />
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <EditImage
            url={`${baseUrl}/${editImage.image}`}
            title={editImage.title}
            onSave={handleImageSave}
          />
        </Modal>
      )}
      {isResetPassword && (
         <Modal isOpen={isResetPassword} onClose={() => setModalOpen(false)}>
            <ResetPassword 
                    userId={userData.id} 
                    onReset={handleReset}/>
         </Modal>
      )}
    </div>
    </DndProvider> 
  );
}
