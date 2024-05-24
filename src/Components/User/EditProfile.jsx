import React, { useEffect, useState } from "react";
import "./user.css";
import { Button, TextField } from "@mui/material";
import { formateJoiningDateTime } from "./userUtils";
import toast from "react-hot-toast";
import { validate } from "../Auth/Validation";
import { useNavigate } from "react-router-dom";
import { getUserDetails, update_UserDetails, uploadProfileImage } from "../../Api/User";
import { CameraAlt } from "@mui/icons-material";
import ProfileLogo from "../../assets/person.svg";
//fire base
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import Loader from "../../common/Loader";
function EditProfile() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [isloading ,setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    profile_image_path: "",
    joinDate: "",
    isEmailVerified: "",
    isBlocked: "",
    role: "",
  });

  const fetchUserDetails = async () => {
    const userDetailsResponse = await getUserDetails();
    console.log(userDetailsResponse.data, "from here");
    const data = userDetailsResponse.data;
    setUserDetails({
      userId: data.userId,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      profile_image_path: data.profile_image_path,
      joinDate: data.joinDate,
      isEmailVerified: data.isEmailVerified,
      isBlocked: data.isBlocked,
      role: data.role,
    });
    setFormData({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
    });
    setProfilePic(data.profile_image_path);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUserDetails();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if(selectedFile  == null){
      toast.error('please select a image ')
      return;
    }
    const storage = getStorage();
    const storageRef = ref(storage,selectedFile.name)

    try {
      setIsLoading(true);
      await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(storageRef);
      console.log("URL:", url);
      const response = await uploadProfileImage(url);
      toast.success("profile pic updated");
      console.log("Profile picture uploaded:", response);
      fetchUserDetails(setUserDetails);
    } catch (error) {
      console.log("Profile picture uploaded:", error);
    }finally{
      setIsLoading(false);
    }
  };

  //showing image preview to user while user try to change the profile pic START
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  //showing image preview to user while user try to change the profile pic END
  const handleValidation = () => {
    const errors = validate(formData);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!handleValidation()) {
      toast.error("please fill the form correctly")
      return;
    }
    if(formData.fullName === '' || formData.phoneNumber === ''){
      toast.error("please fill the form correctly")
      return;
    }
    try {
      const response = await update_UserDetails(formData);
      console.log(response.data);
      fetchUserDetails(setUserDetails);
      toast.success("Your details updated");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const formatedJoiningDate = formateJoiningDateTime(userDetails.joinDate);

 

  return (
    <>
    {isloading && <Loader/>}
      <div className="project-container px-2 ">
        <div className="max-w-4xl max-w-2sm mx-auto">
          <p className=" font-semibold profile-text ">Edit Profile</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="profile-img-container relative">
              <img
                src={profilePic !== null ? profilePic : ProfileLogo}
                className="profile-img"
                style={{width:150,height:150 ,borderRadius:100}}
                alt="Profile"
              />
              <label
                htmlFor="fileInput"
                className="edit-icon absolute bottom-3 right-10"
              >
                <CameraAlt fontSize="small" style={{cursor:'pointer'}} />{" "}
              </label>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              hidden
              id="fileInput"
            />
            <Button variant="outlined" onClick={handleUpload}>
              Upload Image
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              label="phoneNumber"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="phoneNumber"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <Button
              variant='contained'
              onClick={updateUserDetails}
            >
              Save changes
            </Button>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
