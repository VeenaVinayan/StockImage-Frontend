import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../components/User/Profile';
import { ProtectedRoute } from './protectedRoute';

const UserRoute: React.FC = () =>{
    return(
         <Routes>
             <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
         </Routes>
    )
}

export default UserRoute;