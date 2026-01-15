import axios from "axios";
import https from "https"
import { getToken } from "./auth.js";

const agent = new https.Agent({
    rejectUnauthorized: false
})

const apiService = axios.create({
    httpsAgent: agent
})

apiService.interceptors.request.use(async (config) => {
    const baseURL = config.baseURL || process.env.CRAFTY_BASE_URL
    if (!baseURL) {
        throw new Error("CRAFTY_BASE_URL is not defined correctly.")
    }
    config.baseURL = baseURL

    const fullUrl = new URL(config.url, baseURL)
    console.log('API Requesting: ', fullUrl.href)
    if (!fullUrl.href.includes("/auth/login")) {
        config.headers.Authorization = `Bearer ${await getToken()}`
    }
    return config;
}, (error) => {
}, (error) => {
    console.error("Request failed:", error.message);
    return Promise.reject(error);
});

export default apiService