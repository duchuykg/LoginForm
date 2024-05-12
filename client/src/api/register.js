import axios from "axios";
import { LINK_SERVER } from "../constant";

export const registerAPI = async (email, password, confirmpassword) => 
{
    return await axios.post(`${LINK_SERVER}/register`, {email, password, confirmpassword});
}
