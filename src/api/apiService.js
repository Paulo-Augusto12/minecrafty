import axios from "axios";
import https from "https"
import { getToken } from "./auth.js";

const agent = new https.Agent({
    rejectUnauthorized: false
})

const apiService = axios.create({
    baseURL: process.env.CRAFTY_BASE_URL,
    httpsAgent: agent
})

apiService.interceptors.request.use(async (config) => {
    const fullUrl = new URL(config.url, config.baseURL)
    console.log('API Requesting: ', fullUrl)
    if (!fullUrl.href.includes("/auth/login")) {
        config.headers.Authorization = `Bearer ${await getToken()}`
    }
    return config;
}, (error) => {
    console.error("Request failed:", error.message);
    return Promise.reject(error);
});

export default apiService