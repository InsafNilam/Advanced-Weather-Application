import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("_auth");

export const authAxios = axios.create({
  baseURL: "https://lucky-teal-duck.cyclic.app/",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
