import axios from "axios";
import customAxios from "../services/customAxios";
import userRoutes from "../services/endpoints/UserEndPoints";
import errorHandler from "./error";



export const register = async (_userFormData) => {
    try {
        const response = await axios.post(userRoutes.register, _userFormData);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};

export const login = async (_loginRequest)=>{
    try {
        const response = await axios.post(userRoutes.login, _loginRequest)
        return response;
        
    } catch (error) {
       return errorHandler(error)
    }
};

export const confirmEmail = async (_verificationToken) =>{
    try {
        const response = axios.post(`${userRoutes.confirmEmail}/${_verificationToken}`)
        return response;

    } catch (error) {
        return  errorHandler(error);
    }
}


export const getForgottenPasswordLink = async(userEmail) => {
    try {
        const response = await axios.get(`${userRoutes.get_forgot_password_link}/${userEmail}`)
        return response;
    } catch (error) {
        return errorHandler(error)
    }
}


export const forgotPassword = async(_changePasswordRequest)=>{
    try {
        const response = axios.post(userRoutes.forgot_password, _changePasswordRequest);
        return response;
    } catch (error) {
        return errorHandler(error)
    }
}

// secure api iam going to use custom Axios that i made
export const getUserDetails = async () =>{
    try {
        const response = await customAxios.get(userRoutes.get_user_details);
        return response;

    } catch (error) {
        return errorHandler(error);
    }
}


export const change_password_withCurrntPassword = async(_changePasswordRequest)=>{
    try {
        const response = customAxios.post(userRoutes.change_password, _changePasswordRequest);
        return response;
    } catch (error) {
        return errorHandler(error)
    }
}

export const uploadProfileImage = async (imageUrl , _config) =>{
    try {
        const response = await customAxios.post(`${userRoutes.add_profile_image}?imageUrl=${imageUrl}`,_config)
        return response;
    } catch (error) {
        return errorHandler(error)
    }
}

export const update_UserDetails = async (_updateRequest)=>{
    try {
        const response = await customAxios.post(userRoutes.update_user_details,_updateRequest);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}