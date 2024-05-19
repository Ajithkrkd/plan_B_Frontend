
const userRoutes = {
    register : 'https://planb-ajithkrkd.online/user/api/auth/register',
    login : 'https://planb-ajithkrkd.online/user/api/auth/login',
    confirmEmail: `https://planb-ajithkrkd.online/user/api/auth/confirm-email`, //pass the verification as path variable 
    get_forgot_password_link: `https://planb-ajithkrkd.online/user/api/auth/get_forgot_password_link`,
    forgot_password:`https://planb-ajithkrkd.online/user/api/auth/forgot_password`,
    // register : 'http://localhost:8080/user/api/auth/register',
    // login : 'http://localhost:8080/user/api/auth/login',
    // confirmEmail: `http://localhost:8080/user/api/auth/confirm-email`, //pass the verification as path variable 
    // get_forgot_password_link: `http://localhost:8080/user/api/auth/get_forgot_password_link`,
    // forgot_password:`http://localhost:8080/user/api/auth/forgot_password`,
//secure only allow by USER
    get_user_details:`/user/api/secure/get_user_details`,
    update_user_details:`/user/api/secure/update_user_details`,
    change_password:`/user/api/secure/change_password`,
    add_profile_image:`/user/api/secure/add_profile_image`
}
export default userRoutes;
