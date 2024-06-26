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
            const userRole = decode.role[0];
            setRole(userRole);
        }
        else{
            navigate('/register')
        }
    },[])

    if (role === null) {
        navigate('/register')
        return;
    }

    return (
        <>
            {role && role === 'ROLE_ADMIN' || 'ROLE_MEMBER' ? <Outlet /> : <Navigate to="/login" />}
        </>
    );

}

export default UserRoutes