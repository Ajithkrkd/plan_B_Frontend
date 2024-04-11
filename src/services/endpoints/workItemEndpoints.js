export const workItemRoutes ={
    createWorkItemURL : `/workItem/create`, //string title,category = epic or issue or task parentWorkItemId ,project id
    changeWorkItemStateURL:`/workItem/changeState`, //new state = todo , doing , done and also workItem id
    getAllWorkItemsURL:`/workItem/getAllWorkItem`, // projectId
    getWorkItemByWorkItemId_URL:`/workItem/getWorkItem`,
    update_title_or_description:`/workItem/update_title_and_description` //workItem id is required but the title and descripton are optional
}