import axios from "axios";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

const cookies = new Cookies();
const accessToken = cookies.get("_auth");

export const authAxios = axios.create({
  baseURL: "https://lucky-teal-duck.cyclic.app/",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const checkValidity = () => {
  let decoded = jwtDecode(accessToken);
  return decoded;
};
