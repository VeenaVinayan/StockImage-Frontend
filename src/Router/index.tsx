import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';

const AppRouter : React.FC = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/*" element={ <AuthRoute />} />
                <Route path="/user/*" element={<UserRoute />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;

