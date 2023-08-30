import { createStore } from "redux";
import UserModel from "../Models/userModel";
import jwtDecode from "jwt-decode";

export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            const container: { user: UserModel } = jwtDecode(this.token);
            this.user = container.user;
        }
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
}
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

export function authReducer(
    currentState = new AuthState(),
    action: AuthAction
): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Register: // payload is token string
        case AuthActionType.Login: // payload is token string
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token);
            newState.user = container.user;
            localStorage.setItem("token", newState.token);
            break;
        case AuthActionType.Logout: 
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newState;
}

export const authStore = createStore(authReducer);
