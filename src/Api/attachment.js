import customAxios from "../services/customAxios";
import { attachmentRoutes } from "../services/endpoints/attachmentEndpoints";
import errorHandler from "./error";


export const addAttachmentToWorkItem = async (workItemId,formData,attachmentDescription,config) =>{
    try {
        const response = await customAxios.post(`${attachmentRoutes.createAttachment_URL}/${workItemId}?attachment_description=${attachmentDescription}`,formData,config);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}

export const getAllAttachmentByWorkItem = async (workItemId) =>{
    try {
        const response = await customAxios.get(`${attachmentRoutes.getAllAttachmentByWorkItem_URL}/${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const deleteAttachment = async (attachmentId) =>{
    try {
        const response = await customAxios.post(`${attachmentRoutes.deleteAttachment_URL}/${attachmentId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}