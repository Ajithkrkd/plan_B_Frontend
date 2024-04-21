import customAxios from "../services/customAxios";
import { workLifeCycleRoutes } from "../services/endpoints/workLifeCycleEndpoints";
import errorHandler from "./error"

export const creatWorkLifeCycle = async (workingLifeCycleDto)=>{
    try {
        console.log(workingLifeCycleDto , 'from here')
        const response = await customAxios.post(`${workLifeCycleRoutes.createWorkLifeCycle_URL}`,workingLifeCycleDto);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}
export const editWorkLifeCycle = async (workingLifeCycleDto,workingLifeCycleId)=>{
    try {
        console.log(workingLifeCycleDto , 'from here', workingLifeCycleId);
        const response = await customAxios.post(`${workLifeCycleRoutes.editWorkLifeCycle_URL}/${workingLifeCycleId}`,workingLifeCycleDto);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}
export const deleteWorkLifeCycle = async (_workLifeCycleId)=>{
    try {
        console.log( _workLifeCycleId, 'from here')
        const response = await customAxios.post(`${workLifeCycleRoutes.deleteWorkLifeCycle_URL}/${_workLifeCycleId}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}

export const getAllWorkLifeCycle = async ()=>{
    try {
        const response = await customAxios.get(`${workLifeCycleRoutes.getAllWorkLifeCycle_URL}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}
