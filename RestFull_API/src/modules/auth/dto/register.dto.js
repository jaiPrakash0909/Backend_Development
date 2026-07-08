import joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js"


class RegisterDto extends BaseDto {
    static schema = joi.object({
        name: joi.string().trim().min(2).max(50).required(),
        email: joi.string().email().lowercase().required(),
        password: joi.string()
        .message("Password must contain 8 chars minimum")
        .min(8).required(),
        role: joi.string().valid("customer", "seller").default("customer")
    })
}

export default RegisterDto