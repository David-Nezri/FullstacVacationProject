import Joi from "joi";

 interface UserModel {
    userId?: number;
    userUuid?: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    roleId?: number;
}

const userValidationSchema = Joi.object<UserModel>({
    userId: Joi.number().optional().positive().integer(),
    userUuid: Joi.string().optional().max(50),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    username: Joi.string().required().min(4).max(50),
    password: Joi.string().required().length(128),
    roleId: Joi.number().optional().positive().integer(),
});

function validateUser(user: UserModel): string {
    const result = userValidationSchema.validate(user);
    return result.error?.message;
}

export { UserModel, validateUser };

