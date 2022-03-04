import http from "./httpService";
import apiConfig from "../config/apiConfig";

const registerUrl = apiConfig.apiUrl + "/register";
const loginUrl = apiConfig.apiUrl + "/login";
const tokenKey = "user";

const register = async (username, password) => {
    return await http.post(registerUrl, { username, password });
};

const login = async (username, password) => {
    const response = await http.post(loginUrl, { username, password });
    localStorage.setItem(tokenKey, response.data.token);
    return response;
};

const logout = () => {
    localStorage.removeItem(tokenKey);
};

const authService = {
    tokenKey,
    register,
    login,
    logout,
};
export default authService;