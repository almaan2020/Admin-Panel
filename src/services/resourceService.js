import http from "./httpService";
import apiConfig from "../config/apiConfig";

const resUrl = apiConfig.apiUrl + "/unknown";

const getResourceList = async (page) => {
    return await http.get(`${resUrl}?page=${page}`);
}

const getResource = async (id) => {
    return await http.get(`${resUrl}/${id}`);
}

const resourceService = {
    getResourceList,
    getResource
};
export default resourceService;
