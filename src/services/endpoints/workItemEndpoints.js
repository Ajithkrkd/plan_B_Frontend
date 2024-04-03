export const workItemRoutes ={
    createWorkItemURL : `/workItem/create`, //string title,category = epic or issue or task parentWorkItemId ,project id
    changeWorkItemStateURL:`/workItem/changeState`, //new state = todo , doing , done and also workItem id
    getAllWorkItemsURL:`/workItem/getAllWorkItem`, // projectId
    getWorkItemByWorkItemId_URL:`/workItem/getWorkItem`
}