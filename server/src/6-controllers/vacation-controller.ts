
import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import {VacationModel} from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacation-logic";

const router = express.Router();

// GET all vacation per user and follower
router.get(
    "/api/vacations/:userUuid",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userUuid: string = request.params.userUuid;            
            const vacations = await vacationLogic.getAllVacationsForUser(
                userUuid
            );
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    }
);

// GET vacation
router.get(
    "/api/vacation/:vacationId",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = +request.params.vacationId;
            const vacation = await vacationLogic.getVacation(vacationId)
            response.json(vacation);
        } catch (err: any) {
            next(err);
        }
    }
);

// Add  vacation
router.post(
    "/api/vacation",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get image file from client
            request.body.image = request.files?.image;

            const vacation = request.body as VacationModel;
            const addedVacation = await vacationLogic.addVacation(vacation);
            response.status(201).json(addedVacation);
        } catch (err: any) {
            next(err);
        }
    }
);

// Update vacation
router.put(
    "/api/vacations/:vacationId",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get image file from client
            request.body.image = request.files?.image;
            // assign vacationID from URL params to vacation object
            request.body.vacationId = +request.params.vacationId;
            const vacation = request.body as VacationModel;
            const updatedVacation = await vacationLogic.updateVacation(
                vacation
            );
            response.json(updatedVacation);
        } catch (err: any) {
            next(err);
        }
    }
);

// Delete vacation
router.delete(
    "/api/vacations/:vacationId",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = +request.params.vacationId;
            await vacationLogic.deleteVacation(vacationId);
            response.sendStatus(204);
        } catch (err: any) {
            next(err);
        }
    }
);

// Assign follow to vacation
router.post(
    "/api/followers",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = request.body?.vacationId;
            const userUuid = request.body?.userUuid;
            const follower = await vacationLogic.followVacation(
                vacationId,
                userUuid
            );
            response.status(201).json(follower);
        } catch (err: any) {
            next(err);
        }
    }
);

// Assign un-follow to vacation
router.delete(
    "/api/followers",
    verifyLoggedIn,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = request.body?.vacationId;
            const userUuid = request.body?.userUuid;
            await vacationLogic.unFollowVacation(vacationId, userUuid);
            response.sendStatus(204);
        } catch (err: any) {
            next(err);
        }
    }
);

// GET vacations for report
router.get(
    "/api/report",
    verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationsData =
                await vacationLogic.getVacationsDataToReport();
            response.json(vacationsData);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router;

