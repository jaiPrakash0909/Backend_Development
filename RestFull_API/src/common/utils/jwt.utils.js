import crypto from "crypto"
import jwt from "jsonwebtoken"



const generateAccessToken = (payload) => {
    jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_SECRET || '15m'
    })
}



const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto 
    .createHash("sha256")
    .update(rawToken)
    .digest("hex")

    return {rawToken, hashedToken}
}


export {
    generateResetToken
}