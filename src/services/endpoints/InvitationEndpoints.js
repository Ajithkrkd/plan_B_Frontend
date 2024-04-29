

export const invitationRoutes = {
    getAllInvitations:`/project/members/invitations`, //we need to pass the access token then only accepts
    acceptInvitation:`/project/members/accept`,
    assignProjectMemberToWorkItem_URL:`/workItem/members/assignToWorkItem` ,//workitemId and memberID
    unAssignMemberFromWorkItem_URL:`/workItem/members/removeFromWorkItem` ,//workitemId and memberID
    removeMemberFromProject_URL :`/project/members/removeMemberFromProject`,
    removeAdminFromProject_URL :`/project/members/removeMemberFromAdmin`,
    assignAdminToProject_URL :`/project/members/assignMemberToAdmin`,
}
