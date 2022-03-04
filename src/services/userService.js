import http from "./httpService";
import apiConfig from "../config/apiConfig";

const userUrl = apiConfig.apiUrl + "/users";

const getUserList = async () => {
    return await http.get(userUrl);
}

const createUser = async (first_name, last_name, email) => {
    return await http.post(userUrl, { first_name, last_name, email });
};

const deleteUser = async (id) => {
    await http.delete(`${userUrl}/${id}`);
};

const userService = {
    getUserList,
    createUser,
    deleteUser,
};
export default userService;