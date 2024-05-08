import customAxios from "../services/customAxios";
import { commentRoutes } from "../services/endpoints/commentsEnpoints";
import errorHandler from "./error"

export const createCommentForWorkItem = async (workItemId,content)=>{
    try {
        console.log(content , 'from here')
        const response = await customAxios.post(`${commentRoutes.createComment_URL}?workItemId=${workItemId}&content=${content}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}

export const getAllCommentsByWorkItemId = async (workItemId)=>{
    try {
        
        const response = await customAxios.get(`${commentRoutes.getAllCommentsByWorkItemId_URL}/${workItemId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}
export const deleteCommentById = async (commentId,workItemId)=>{
    try {
        const response = await customAxios.post(`${commentRoutes.deleteCommentById_URL}/${commentId}?workItemId=${workItemId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}


export const editCommentById = async (commentId,content,workItemId)=>{
    try {
        console.log(commentId)
        const response = await customAxios.post(`${commentRoutes.editCommentById_URL}/${commentId}?content=${content}&workItemId=${workItemId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}