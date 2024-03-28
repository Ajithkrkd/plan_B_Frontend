import customAxios from "../services/customAxios"
import { invitationRoutes } from "../services/endpoints/InvitationEndpoints"
import errorHandle from "./error"


export const getAllInvitation = async () =>{
    try {
        const response = await customAxios(invitationRoutes.getAllInvitations);
        return response;
    } catch (error) {
       return errorHandle(error)
    }
}

export const acceptMemberInvitation  = async (token) =>{
    
    try {
      
        const response = await customAxios.post(`${invitationRoutes.acceptInvitation}?token=${token}`);
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}