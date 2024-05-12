import axios from "axios";
import { LINK_SERVER } from "../constant";

export const getUser = async (email) => {
  try {
    const response = await axios.get(`${LINK_SERVER}/userinfo`, {
      params: { email: email },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};