import React from 'react'
import { useForm } from 'react-hook-form';
import type { TResetPassword } from '../../types/auth.types';

interface ResetPasswordProps {
     userId: string;
     onReset :(data : TResetPassword) => void;
}
const ResetPassword : React.FC <ResetPasswordProps>= ({userId, onReset}) => {

    const { register, 
            handleSubmit, 
            watch,
            formState: { errors} } = useForm<TResetPassword>(); 
     
    const password = watch("newPassword");  
    const onSubmit = async(data : TResetPassword) =>{
       console.log("Form Input Data ::",data);
       onReset(data);
    }  
  return (
    <div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                 <div>
                    <input type="hidden" {...register("userId")} value={userId} />
                    <label className='block text-gray-700 mb-1'>Old password</label>
                    <input
                       type="password"
                       {...register('oldPassword',{required:'Old password is required'})}
                       placeholder='Enter Old Password'
                       className='textBox' />
                    { errors.oldPassword && <p className='text-red-500 text-sm'>{errors.oldPassword.message}</p> }   
                 </div>
                 <div>
                    <label className='block text-gray-700 mb-1'>New password</label>
                    <input
                        type="password"
                        className='textBox'
                        placeholder='Enter new password'
                        {...register('newPassword',{
                             required:'New Password id required',
                             pattern:{
                                value:/^(?=.*[A-za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                                message:'Password must be 8-20 chars, include letters , numbers and special characters[A-Z a-z 0-9 _$@*! ]'
                             }
                        })}
                        />
                        { errors.newPassword && <p className='text-res-500 text-sm'>{errors.newPassword.message}</p>}
                 </div>
                 <div>
                    <label className='block text-gray-700 mb-1'>Confirm new password</label>
                    <input 
                       type="password"
                       className='textBox'
                       placeholder='Enter confirm password'
                       {...register('conPassword',{
                          required:'Confirm password required',
                          validate:(value) => value === password || " Password do not match"
                       })}
                     />
                     {errors.conPassword && <p className='text-red-500 text-sm'>{errors.conPassword.message}</p>}
                 </div>
                 <button type="submit" className='btn'>
                     Submit
                 </button>
            </form>
     </div>
  )
}

export default ResetPassword
