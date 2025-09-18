export type TRegisterFormInput ={
    name:string;
    email:string;
    phone:string;
    password:string
    confirmPassword:string;
}

export type TLoginUser = {
    email:string;
    password:string;
}

export type TUserData = {
    id:string;
    name:string;
    phone:string;
    email:string;
}

export type TLoginResult ={
    userData:TUserData;
    accessToken:string;
    refreshToken:string;
}

export type TResponseType ={
     success: boolean;
     message :string;
}

export type TResetPassword ={
    userId: string;
    oldPassword : string;
    newPassword: string;
    conPassword: string;
}