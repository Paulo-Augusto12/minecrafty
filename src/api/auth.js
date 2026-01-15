import { jwtDecode } from "jwt-decode"
import apiService from "./apiService.js"

let token = ""
let loginPromise = null

async function craftyLogin() {
    const response = await apiService.post("/api/v2/auth/login", {
        username: process.env.CRAFTY_LOGIN,
        password: process.env.CRAFTY_PASSWORD
    })

    if (response.data && response.data.data && response.data.data.token) {
        const receivedToken = response.data.data.token
        const decodedToken = jwtDecode(receivedToken)

        token = receivedToken

        console.log("Received Token data ✓: ", decodedToken)
    }

}

async function getToken() {
    if (token) return token

    if (!loginPromise) {
        loginPromise = craftyLogin().finally(() => {
            loginPromise = null
        })
    }

    return loginPromise
}

async function clearToken() {
    token = ""
    loginPromise = null
}

export { getToken, clearToken }