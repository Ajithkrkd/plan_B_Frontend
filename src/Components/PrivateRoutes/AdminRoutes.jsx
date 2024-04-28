import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';
const AdminRoutes = () => {

    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(()=>{
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            const decode = jwtDecode(accessToken)
            const userRole = decode.role;
            console.log(userRole)
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
            {role && role === "ROLE_ADMIN" ? <Outlet /> : <Navigate to="/error" />}
        </>
    );

}

export default AdminRoutes
