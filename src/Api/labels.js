import customAxios from "../services/customAxios";
import { labelRoutes } from "../services/endpoints/labelEndpoints";
import errorHandler from "./error";


export const createLabel = async (workItemId,title) =>{
    try {
        const response = await customAxios.post(`${labelRoutes.createLabel}?workItemId=${workItemId}&label=${title}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}
export const deletLabelByLabelId = async (workItemId,labelId) =>{
    try {
        const response = await customAxios.post(`${labelRoutes.deleteLabel}?labelId=${labelId}&workItemId=${workItemId}`);
        return response;
    } catch (error) {
       return errorHandler(error)
    }
}