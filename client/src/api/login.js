import axios from "axios";
import { LINK_SERVER } from "../constant";

export const loginAPI = async (email, password) => 
{  
    return await axios.post(`${LINK_SERVER}/login`, {email, password});
    
}
