import axios from "axios";
import { BASE_URL } from "src/config";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export { axiosInstance };
