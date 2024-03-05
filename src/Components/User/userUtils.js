
import customAxios from "../../store/customAxios";



export const USER_BASE_SECURE_URL = '/user/api/secure/'
export const USER_DETAILS_URL = `${USER_BASE_SECURE_URL}get_user_details`
export const USER_UPDATE_URL = `${USER_BASE_SECURE_URL}update_user_details`


export const fetchUserDetails = async (setFormData) => {
    try {
      const response = await customAxios.get(USER_DETAILS_URL);
      console.log(response);
      localStorage.setItem("userData",JSON.stringify(response.data))
       console.log(response.data, "from uyserlkjafhsdasd");
      setFormData({
        userId:response.data.userId,
        fullName: response.data.fullName,
        phoneNumber: response.data.phoneNumber,
        email: response.data.email,
        profileImagePath: response.data.profile_image_path,
        joinDate : response.data.joinDate,
        isEmailVerified : response.data.isEmailVerified,
        isBlocked:response.data.isBlocked,
        role: response.data.role,
        joinDate:response.data.joinDate
      });
    } catch (error) {
      console.log(error);
    }
  };
  