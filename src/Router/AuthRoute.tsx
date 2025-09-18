import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import Register from '../components/Register';
import Login from '../components/Auth/Login';

const AuthRoute : React.FC = () =>{
    return(
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    )
}

export default AuthRoute;