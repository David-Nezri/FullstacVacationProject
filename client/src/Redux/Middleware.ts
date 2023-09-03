import { Store } from "redux";
import { VacationsState,VacationsAction } from "./VacationsState";

let counter = 0;

export function countActions(vacationsStore: any) {
    return function (next: Function) {
        return function (action: VacationsAction) {
            console.log(`Current Action: ${action.type}, Total Actions: ${++counter}`);

            // Here, store contains the current state (before dispatch)

            next(action); // Here the reducer will be invoked

            // Here, store contains the next state (after dispatch)

        }
    }
}