import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../components/User/Profile';

const UserRoute: React.FC = () =>{
    return(
         <Routes>
             <Route path="/profile" element={<Profile/> } />
         </Routes>
    )
}

export default UserRoute;