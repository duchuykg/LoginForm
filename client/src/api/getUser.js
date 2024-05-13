import axios from "axios";
import { LINK_SERVER } from "../constant";

export const getUser = async (token) => {
  try {
    const response = await axios.get(`${LINK_SERVER}/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    return null;
  }
};