
const url = import.meta.env.API_GATEWAY_BASE_URL;
const userRoutes = {
    register : 'http://35.200.216.229:8080/user/api/auth/register',
    login : 'http://35.200.216.229:8080/user/api/auth/login',
    confirmEmail: `http://35.200.216.229:8080/user/api/auth/confirm-email`, //pass the verification as path variable 
    get_forgot_password_link: `http://35.200.216.229:8080/user/api/auth/get_forgot_password_link`,
    forgot_password:`http://35.200.216.229:8080/user/api/auth/forgot_password`,

//secure only allow by USER
    get_user_details:`/user/api/secure/get_user_details`,
    update_user_details:`/user/api/secure/update_user_details`,
    change_password:`/user/api/secure/change_password`,
    add_profile_image:`/user/api/secure/add_profile_image`
}
export default userRoutes;
