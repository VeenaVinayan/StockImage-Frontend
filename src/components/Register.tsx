import React  from 'react';
import { useForm } from 'react-hook-form';
import type { TRegisterFormInput } from '../types/auth.types';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate ,Link} from 'react-router-dom';

const Register : React.FC = () => {
  const navigate = useNavigate();  
   const { register,
          handleSubmit, 
          watch,
          formState: {errors} } = useForm<TRegisterFormInput>(); 
   const onSubmit = async(data : TRegisterFormInput) =>{
     console.log("Form Data ::",data);
     
     const status = await authService.userRegister(data);
     console.log(status);
     if(status === 201){
        console.log("Reached back to register");
        toast.success('User Successfully registred !!');
        navigate('/login');
     }else{
        toast.error('Error occured !!');
     }
   }
   const password = watch("password");
  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
     <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md fixed top-0 z-20">
        <h1 className="text-2xl font-bold text-teal-600">ShotStack</h1>
      </header>
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
     <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Create an Account
    </h2>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          {...register("name",{required:"Name is required "})}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
         />
         { errors.name && (<p className='text-res-500 text-sm'>{errors.name.message}</p>) }
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          {...register("email",{
             required:"Email is required",
             pattern:{
                 value:/^\S+@\S+$/i,
                 message:'Enter a valid Email'
             },
          })}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          {...register("phone",{
            required:"Phone number is required ",
            minLength: { value:10,message:'Must be at leat 10 digits'},
          })}
        />
        {errors.phone && (<p className='text-rose-500 text-sm'>{errors.phone.message}</p>)}
      </div>
       <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          {...register("password",{
            required:"Password is required ",
            pattern:{
                value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                message:'Password must be 8-20 chars, include letters, numbers & special characters',
            }
           })}
        />
        {errors.password && (<p className='text-rose-500 text-sm'>{errors.password.message}</p>)}
      </div>
       <div>
        <label className="block text-gray-700 mb-1">Re-Type Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          {...register("confirmPassword",{
            required:"Re-Type password is required ",
            validate:(value) => value === password || "Password do not match"
          })}
        />
        {errors.confirmPassword && (<p className='text-rose-500 text-sm'>{errors.confirmPassword.message}</p>)}
      </div>
    
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition duration-200"
      >
        Register
      </button>
    </form>
    <Link to="/login"
          className=" text-teal-600 text-sm px-4 py-2 text-center  hover:underline transition">
      Already signed In  Login Here !
    </Link>
  </div>
</div>
  )
}

export default Register
