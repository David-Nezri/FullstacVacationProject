import Joi from "joi";

export interface CredentialModel {
    username: string;
    password: string;
}

 const validationSchema = Joi.object<CredentialModel>({
    username: Joi.string().required().min(4).max(50),
    password: Joi.string().required().length(128),
});

export function validateCredential(credential: CredentialModel): string {
    const result = validationSchema.validate(credential);
    return result.error?.message;
}


