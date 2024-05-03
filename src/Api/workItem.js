import { CloseFullscreen } from "@mui/icons-material";
import customAxios from "../services/customAxios";
import { workItemRoutes } from "../services/endpoints/workItemEndpoints";
import errorHandler from "./error";
export const createWorkItem = async (title, workItemCategory,projectId) => {
    try {
        const response = await customAxios.post(`${workItemRoutes.createWorkItemURL}?title=${title}&workItemCategory=${workItemCategory}&projectId=${projectId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}

export const createChildWorkItem = async (title, workItemCategory,projectId,parentWorkItemId) => {
    try {
        const response = await customAxios.post(`${workItemRoutes.createWorkItemURL}?title=${title}&workItemCategory=${workItemCategory}&parentWorkItemId=${parentWorkItemId}&projectId=${projectId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}

export const createWorkItemWithParent = async (title, workItemCategory, parentWorkItemId, projectId) => {
    try {
    
console.log(parentWorkItemId)
        const response = await customAxios.post(`${workItemRoutes.createWorkItemURL}?title=${title}&workItemCategory=${workItemCategory}&parentWorkItemId=${parentWorkItemId}&projectId=${projectId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}


export const getAllWorkItems = async (_projectId) =>{
    try {
        const response = await customAxios.get(`${workItemRoutes.getAllWorkItemsURL}/${_projectId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const changeStateOfWorkItem = async (state,workItemId) =>{
    try {
        const response = await customAxios.post(`${workItemRoutes.changeWorkItemStateURL}?newState=${state}&workItemId=${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const getWorkItemById = async (workItemId) =>{
    try {
        const response = await customAxios(`${workItemRoutes.getWorkItemByWorkItemId_URL}/${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const updateWorkItemTitle = async (title , workItemId) =>{
    try {
        const response = await customAxios.post(`${workItemRoutes.update_title_or_description}?workItemId=${workItemId}&title=${title}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const updateWorkItemDescription = async (description , workItemId) =>{
    try {
        const response = await customAxios.post(`${workItemRoutes.update_title_or_description}?workItemId=${workItemId}&description=${description}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}

export const getAllChildWorkItemsByParentWorkItemId = async (workItemId) =>{
    try {
        const response = await customAxios.get(`${workItemRoutes.getChildWorkItems_URL}/${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}

export const getAllWorkItemBySpecificMember = async (memberId ,projectId) =>{
    try {
        const response = await customAxios.get(`${workItemRoutes.getAllWorkItemBySpecificMember_URL}?userId=${memberId}&projectId=${projectId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const assignToWorkLifeCycle = async (workItemId,workLifeCycleId,projectId) =>{
    try {
        const response = await customAxios.post(`${workItemRoutes.assignToWorkLifeCycle_URL}?workItemId=${workItemId}&workLifeCycleId=${workLifeCycleId}&projectId=${projectId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}

export const requestForChangingWorkItemDeadLine = async (workItemId,reason) =>{
    try {
        const response = await customAxios.post(`${workItemRoutes.changeDeadLineOfWorkItemRequest_URL}?reason=${reason}&workItemId=${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}