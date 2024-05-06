import customAxios from "../services/customAxios";
import { attachmentRoutes } from "../services/endpoints/attachmentEndpoints";
import errorHandler from "./error";


export const addAttachmentToWorkItem = async (workItemId,attachmentDetailsDTO) =>{
    console.log(attachmentDetailsDTO)
    try {
        const response = await customAxios.post(`${attachmentRoutes.createAttachment_URL}/${workItemId}`,attachmentDetailsDTO);
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
export const deleteAttachment = async (attachmentId,workItemId) =>{
    try {
        const response = await customAxios.post(`${attachmentRoutes.deleteAttachment_URL}/${attachmentId}?workItemId=${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const updateDescrition = async (attachmentId ,descriptionn,workItemId) =>{
    try {
        const response = await customAxios.post(`${attachmentRoutes.update_description_URL}?attachmentId=${attachmentId}&description=${descriptionn}&workItemId=${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}