import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";


class LoginDto extends BaseDto {
    static schema = Joi.object({
        email: Joi.tring().email().required(),
        password: Joi.string().required(),
    });
}

export default LoginDto