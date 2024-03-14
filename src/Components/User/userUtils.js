
import { getUserDetails } from "../../Api/User";


export const fetchUserDetails = async (setUserDetails) => {
  try {
    const response = await getUserDetails();
    setUserDetails(prevState => ({
      ...prevState,
      userId: response.data.userId,
      fullName: response.data.fullName,
      phoneNumber: response.data.phoneNumber,
      email: response.data.email,
      profile_image_path: response.data.profile_image_path,
      joinDate: response.data.joinDate,
      isEmailVerified: response.data.isEmailVerified,
      isBlocked: response.data.isBlocked,
      role: response.data.role,
      joinDate: response.data.joinDate
    }));
  } catch (error) {
    console.log(error);
  }
};

  

  export function formateJoiningDateTime (joinDate){
    const dateString = joinDate;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const reformattedDate = day + " " + month + " " + year;
    return reformattedDate;

  }

  