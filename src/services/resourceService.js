import http from "./httpService";
import apiConfig from "../config/apiConfig";

const resUrl = apiConfig.apiUrl + "/unknown";

const getResourceList = async () => {
    return await http.get(resUrl);
}

const resourceService = {
    getResourceList,
};
export default resourceService;