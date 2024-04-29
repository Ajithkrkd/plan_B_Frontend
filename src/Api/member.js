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

export const assignProjectMemberToWorkItem = async (workItemId,memberId,projectId) =>{
    try {
        const response = await customAxios.post(`${invitationRoutes.assignProjectMemberToWorkItem_URL}?workItemId=${workItemId}&memberId=${memberId}&projectId=${projectId}`);
        return response;
    } catch (error) {
       return errorHandle(error)
    }
}
export const unAssignMemberFromWorkItem = async (workItemId,projectId) =>{
    try {
        const response = await customAxios.post(`${invitationRoutes.unAssignMemberFromWorkItem_URL}?workItemId=${workItemId}&projectId=${projectId}`);
        return response;
    } catch (error) {
       return errorHandle(error)
    }
}

export const removeMemberFromProject = async (projectId ,memberId) =>{
    try {
        const response = await customAxios.post(`${invitationRoutes.removeMemberFromProject_URL}?projectId=${projectId}&memberId=${memberId}`);
        return response;
    } catch (error) {
       return errorHandle(error)
    }
}

export const removeAdminFromProject = async (projectId ,memberId) =>{
    try {
        const response = await customAxios.post(`${invitationRoutes.removeAdminFromProject_URL}?projectId=${projectId}&memberId=${memberId}`);
        return response;
    } catch (error) {
       return errorHandle(error)
    }
}
export const assignAdminToProject = async (projectId ,memberId) =>{
    try {
        const response = await customAxios.post(`${invitationRoutes.assignAdminToProject_URL}?projectId=${projectId}&memberId=${memberId}`);
        return response;
    } catch (error) {
       return errorHandle(error)
    }
}
