import http from "./httpService";
import apiConfig from "../config/apiConfig";

const resourceUrl = apiConfig.apiUrl + "/unknown";

const getResourceList = async (page) => {
    return await http.get(`${resourceUrl}?page=${page}`);
}

const getResource = async (id) => {
    return await http.get(`${resourceUrl}/${id}`);
}

const resourceService = {
    getResourceList,
    getResource
};
export default resourceService;
