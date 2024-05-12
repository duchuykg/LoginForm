import axios from 'axios';
import { LINK_SERVER } from '../constant';

export const loginGithub = async (data) => {
  try {
    const access_token = await axios.post(`${LINK_SERVER}/getTokenGithub`, data);
    const response = await axios.get(`${LINK_SERVER}/getUserData`, {
      headers: {
          Authorization: `Bearer ${access_token.data}`,
      },
    });
  
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("token", access_token.data)
      localStorage.setItem("user_data", JSON.stringify(response.data))
    }

    return access_token
  } catch (error) {
    console.error('Error login:', error);
    return null;
  }
}