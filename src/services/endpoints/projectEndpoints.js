const projectRoutes = {
    //ALl the endpoints are secure and sent through api gateway http://localhost:8080 this prefix has already 
    //in the customAxios config 
    createProject_URL :`/project/create`,
    getAllProjectOfUser_URL:`/project/get_all_projects`, //This is a get method we only sent the Authorization token for identifying user 
    getProjectById_URL: `/project` , // This will return all details of perticular project we need to pass project id also /project/12
    sentInvitation_URL:'/project/members/invite' //also pass the project id as pathvariable
}
export default projectRoutes;