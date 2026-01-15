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

        console.log("✓ Login realizado com sucesso")
        console.log("Token data:", decodedToken)

        return token
    }

    throw new Error("Failed to get token from login response")
}

async function getToken() {
    if (token) {
        return token
    }

    if (!loginPromise) {
        console.log("🔐 Fazendo login no Crafty...")
        loginPromise = craftyLogin().finally(() => {
            loginPromise = null
        })
    }

    await loginPromise
    return token
}

async function clearToken() {
    token = ""
    loginPromise = null
    console.log("✓ Token limpo da memória")
}

export { getToken, clearToken }