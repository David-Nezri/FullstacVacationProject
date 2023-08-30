import Joi from "joi";
import { UploadedFile } from "express-fileupload";

interface VacationModel {
    vacationId?: number;
    destination: string;
    description: string;
    image?: UploadedFile;
    imageName?: string;
    startDate: string;
    endDate: string;
    price: number;
}

const vacationValidationSchema = Joi.object<VacationModel>({
    vacationId: Joi.number().optional().positive().integer(),
    destination: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.object().optional(),
    imageName: Joi.string().optional().max(50),
    startDate: Joi.string().required().min(8).max(100),
    endDate: Joi.string().required().min(8).max(100),
    price: Joi.number().required().positive(),
});

function validateVacation(vacation: VacationModel): string {
    const result = vacationValidationSchema.validate(vacation);
    return result.error?.message;
}

export { VacationModel, validateVacation };

