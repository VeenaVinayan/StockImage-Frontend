import React from 'react'
import { useForm } from 'react-hook-form';
import type { TLoginUser, TLoginResult } from '../../types/auth.types';
import authService from '../../services/authService';
import { useNavigate ,Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const  Login: React.FC = () => {
    const navigate = useNavigate();
    const { register, 
            handleSubmit,
            formState:{errors } } = useForm<TLoginUser>();
    
    const onSubmit = async(data : TLoginUser) =>{
        console.log('Login  Data ::',data);
        const res : TLoginResult = await authService.userLogin(data);
        if(res){
           const { userData } = res;
           console.log('Result value in Login ::',userData);
           console.log("After login data = ",userData);
           localStorage.setItem("accessToekn",res.accessToken);
           toast('login Successfully');
           navigate('/user/profile',{state:userData}); 
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md fixed top-0 z-20">
        <h1 className="text-2xl font-bold text-teal-600">ShotStack</h1>
      </header>
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
     <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
      Login Here | StockStack
    </h2>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          {...register("password",{
             required:"Password is required",
             pattern:{
                 value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                 message:'Enter a valid Password'
             },
          })}
        />
        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
      </div>
   
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition duration-200"
      >
        Login
      </button>
    </form>
    <Link to='/register' className='text-teal-700 hover:underline text-sm'>
     Don't have an account Register Here !
    </Link>
  </div>
</div>
  )
}

export default Login;
