import errorHandler from "../../Api/error"
import customAxios from "../../services/customAxios";
import { chatRoutes } from "./chatEndponits";


export const getAllChatMessages = async () =>{
    try {
        const response = await customAxios.get(chatRoutes.getAllChatMessages_url);
        return response.data;
    } catch (error) {
        return errorHandler(error);
    }
}