import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';
const UserRoutes = () => {

    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(()=>{
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            const decode = jwtDecode(accessToken)
            const userRole = decode.roles[0];
            setRole(userRole);
        }
    },[])

    if (role === null) {
        navigate('/register')
        return;
    }

    return (
        <>
            {role === 'USER' ? <Outlet /> : <Navigate to="/login" />}
        </>
    );

}

export default UserRoutes