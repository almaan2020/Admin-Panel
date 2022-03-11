import http from "./httpService";
import apiConfig from "../config/apiConfig";

const userUrl = apiConfig.apiUrl + "/users";

const getUserList = async (page) => {
    return await http.get(`${userUrl}?page=${page}`);
}

const getUser = async (id) => {
    return await http.get(`${userUrl}/${id}`);
}

const createUser = async (first_name, last_name, email) => {
    return await http.post(userUrl, { first_name, last_name, email });
};

const editUser = async (id, first_name, last_name, email) => {
    return await http.put(`${userUrl}/${id}`, { first_name, last_name, email });
}

const deleteUser = async (id) => {
    await http.delete(`${userUrl}/${id}`);
};

const userService = {
    getUserList,
    getUser,
    createUser,
    editUser,
    deleteUser,
};
export default userService;
