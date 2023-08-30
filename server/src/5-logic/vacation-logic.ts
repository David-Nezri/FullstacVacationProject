import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import {ClientError,IdNotFoundError} from "../4-models/client-errors";
import VacationFollowersModel from "../4-models/vacation-followers-model";
import {VacationModel, validateVacation} from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";
import config from "../2-utils/config";
import {FollowerModel} from "../4-models/follower-model";


// GET all vacation per user with followers 
async function getAllVacationsForUser(
    userUuid: string
): Promise<VacationFollowersModel[]> {
    const sql =
        `SELECT DISTINCT V.*, EXISTS(SELECT * FROM followers
         WHERE vacationId = F.vacationId AND userId = (SELECT userId FROM users WHERE userUuid = ?)) AS isFollowing,
         COUNT(F.userId) AS followersCount FROM vacations as V LEFT JOIN followers as F ON V.vacationId = F.vacationId GROUP BY vacationId ORDER BY startDate ASC`;
    const vacations = await dal.execute(sql, [userUuid]);
    return vacations;
}

// GET vacation 
async function getVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT * FROM vacations WHERE vacationId = ?`;
    const vacation = await dal.execute(sql, [vacationId]);
    return vacation;
}

// Add a vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate vacation 
    const validationError = validateVacation(vacation);
    if (validationError) {
        console.error("Validation error:", validationError);
    } else {
        console.log("add vacation");
    }

    // Handle image
    if (vacation.image) {
        const extractImage = vacation.image.name.substring(
            vacation.image.name.lastIndexOf(".")
        ); // Extract image 
        vacation.imageName = uuid() + extractImage; // Save new image in vacation object
        await vacation.image.mv(config.imagesFolderPath + vacation.imageName); // Move image to images folder
        delete vacation.image; // Delete image before saving
    }

    // Add to db
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.imageName,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
    ]);
    vacation.vacationId = result.insertId;
    return vacation;
}

// Update vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    const validationError = validateVacation(vacation);
    if (validationError) {
        console.error("Validation error:", validationError);
    } else {
        console.log("updated");
    }
    // Handle image
    if (vacation.image) {       
        await safeDelete(config.imagesFolderPath + vacation.imageName); // Delete previous image
        const extractImage = vacation.image.name.substring(
            vacation.image.name.lastIndexOf(".")
        ); // Extract image 
        vacation.imageName = uuid() + extractImage;
        await vacation.image.mv(config.imagesFolderPath + vacation.imageName); // Move image to images folder
        delete vacation.image; // Delete image before saving
    }
    const sql =
        `UPDATE vacations SET destination = ?, description = ?, imageName = ?, startDate = ?, endDate = ?, price = ?
         WHERE vacations.vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.imageName,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.vacationId,
    ]);
    if (result.affectedRows === 0)
        throw  IdNotFoundError(vacation.vacationId);
    return vacation;
}

// Delete a vacation
async function deleteVacation(vacationId: number): Promise<void> {
    // Find image name of vacation 
    const findImageName =
        `SELECT imageName FROM vacations WHERE vacationId = ?`;
    const imageNameResult = await dal.execute(findImageName, [vacationId]);
    // Extract the image name from result
    const imageNameToDelete = imageNameResult[0].imageName;
    // Delete image 
    await safeDelete(config.imagesFolderPath + imageNameToDelete); // Delete image
    // Delete vacation 
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, [vacationId]);
    if (result.affectedRows === 0) throw  IdNotFoundError(vacationId);
}

// follow 
async function followVacation(
    vacationId: number,
    userUuid: string
): Promise<FollowerModel> {
    const sql =
        `INSERT INTO followers VALUES ((SELECT userId FROM users WHERE userUuid = ?), ? )`;
    await dal.execute(sql, [
        userUuid,
        vacationId,
        userUuid,
        vacationId,
    ]);
    
    function createFollowerModel(follower: FollowerModel): FollowerModel {
        return {
            userUuid: follower.userUuid,
            vacationId: follower.vacationId,
        };
    }
     const follower =  createFollowerModel({"userUuid": userUuid, "vacationId": vacationId});
     return follower;
}

// un-follow 
async function unFollowVacation(
    vacationId: number,
    userUuid: string
): Promise<void> {
    const sql =
        `DELETE FROM followers WHERE (userId = (SELECT userId FROM users WHERE userUuid = ?) AND vacationId = ? )`;
    const result: OkPacket = await dal.execute(sql, [userUuid, vacationId]);
    if (result.affectedRows === 0)
        throw  ClientError(404, "following not found");
}

// vacations data for report
async function getVacationsDataToReport(): Promise<VacationFollowersModel[]> {
    const sql =
        `SELECT V.vacationId, V.destination, COUNT(F.userId) AS followersCount FROM vacations as V LEFT JOIN followers as F ON V.vacationId = F.vacationId GROUP BY vacationId`;
    const vacationsData = await dal.execute(sql, []);
    return vacationsData;
}

export default {
    getAllVacationsForUser,
    getVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    followVacation,
    unFollowVacation,
    getVacationsDataToReport,
};
