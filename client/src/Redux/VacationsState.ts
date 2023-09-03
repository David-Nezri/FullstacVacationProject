import { applyMiddleware, createStore } from "redux";
import VacationForUserModel from "../Models/vacationForUserModel";
import logger from "redux-logger";
import { countActions } from "./Middleware";


export class VacationsState {
    public vacations: VacationForUserModel[] = []; //global data.
}

export enum VacationsActionType {
    FetchVacations = "FetchVacations", // Fetch all vacations from server
    AddVacation = "AddVacation", // Add new vacation
    UpdateVacation = "UpdateVacation", // Update vacation
    DeleteVacation = "DeleteVacation" // Delete vacation
}
export interface VacationsAction {
    type: VacationsActionType; // the action
    payload: any; // the data we send
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    //change on the newState 
    switch (action.type) {

        case VacationsActionType.FetchVacations: //payload: all vacations fetched from the server
            newState.vacations = action.payload; // Set all fetched vacations to the state
            break;

        case VacationsActionType.AddVacation: // payload: vacation to add
            newState.vacations.push(action.payload); // Add the new vacation to the state
            break;

        case VacationsActionType.UpdateVacation: // payload: vacation to update
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId); // -1 if not exist
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload; // Update
            }
            break;

        case VacationsActionType.DeleteVacation: // payload: id to delete
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload); // -1 if not exist
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1); // Delete
            }
            break;
    }

    return newState; // return new state
}

export const vacationsStore = createStore(vacationsReducer , applyMiddleware(countActions, logger));

