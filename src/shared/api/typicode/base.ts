import axios from "axios";
const API_URL = "http://localhost:3001/api/"
// Потенциально, можно передавать accessToken
export const apiInstance = axios.create({
    baseURL: API_URL
});
