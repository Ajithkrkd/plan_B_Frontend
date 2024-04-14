import { createWorkItem } from "../../Api/workItem";
import { getAllWorkLifeCycle } from "../../Api/workLifeCycle";

export const workLifeCycleRoutes = {

    createWorkLifeCycle_URL : `/workItem/workingLifeCycle/create` , // worklife cycle dto expecting
    editWorkLifeCycle_URL : `/workItem/workingLifeCycle/edit`,//expecting a work lifecycle id as path variable
    deleteWorkLifeCycle_URL : `/workItem/workingLifeCycle/delete`,//expecting a work lifecycle id as path variable
    getAllWorkLifeCycle_URL :'/workItem/workingLifeCycle/getAll',

}