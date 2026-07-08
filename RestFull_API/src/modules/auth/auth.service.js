import { generateResetToken } from "../../common/utils/jwt.utils.js"
import User from "./auth.model.js"


const register = async ({name, email, password, role})=> {
    
    const existing = User.findOne({email})
    if(existing) throw ApiError.conflict("Email already exists")

        const {rawToken, hashedToken} = generateResetToken()

        const user = await User.create({
            name,
            email,
            password,
            role,
            verificationToken: hashedToken
        })

        //send and email to user with token: rawToken

        const userObj = user.toObject()
        delete userObj.passworddelete
        delete userObj.verificationToken


    return userObj
}


export {register}