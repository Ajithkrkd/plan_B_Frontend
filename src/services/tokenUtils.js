

import axios from "axios";


export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  console.log(refreshToken ,'from utils')
  const refreshTokenUrl = 'http://localhost:8080/user/api/auth/refreshToken';

  console.log(refreshToken ,'from refresh')
  const headers = {
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response = await axios.post(
        refreshTokenUrl, {}, { headers }
    )
  
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
  
}
