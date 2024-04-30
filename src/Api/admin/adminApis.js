
import customAxios from "../../services/customAxios";
import { AdminRoutes } from "../../services/endpoints/admin/adminEndpoints";
import errorHandler from "../error"

export const getAllUsers = async () => {
    try {
        const response = await customAxios.get(AdminRoutes.getAllUsers_URL);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}
export const getAllProjects = async () => {
    try {
        const response = await customAxios.get(AdminRoutes.getAllProjects_URL);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}

export const isProjectAdmin = async (projectId) => {
    try {
        const response = await customAxios.get(`${AdminRoutes.isAdminChek_URL}?projectId=${projectId}`)
        return response;
    } catch (error) {
        return errorHandler(error);
    }
}