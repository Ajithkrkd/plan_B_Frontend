import customAxios from "../services/customAxios";
import projectRoutes from "../services/endpoints/projectEndpoints";
import errorHandler from "./error";


export const getAllProjectOfUser = async () =>{
    try {
        const response = await customAxios.get(projectRoutes.getAllProjectOfUser_URL);
        return response;

    } catch (error) {
        return errorHandler(error);
    }
}

export const createProject = async(formdata)=>{
    try {
        const response = customAxios.post(projectRoutes.createProject_URL,formdata);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}


export const getProjectDetailsByProjectId = async(projectId)=>{
    try {
        const response = customAxios.get(`${projectRoutes.getProjectById_URL}/${projectId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}

export const sentInvitaionForMember = async(projectId,_invitationRequest)=>{
    try {
        const response = customAxios.post(`${projectRoutes.sentInvitation_URL}/${projectId}`,_invitationRequest);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}
