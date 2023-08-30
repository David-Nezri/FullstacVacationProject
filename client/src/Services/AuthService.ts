
import axios from "axios";
import CredentialsModel from "../Models/credentialsModel";
import UserModel from "../Models/userModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import config from "../Utils/Config";

const createAuthService = () => {
  const register = async (user: UserModel): Promise<void> => {
    // Send user object to server, get back token
    const response = await axios.post<string>(config.routes.register, user);

    // Extract token
    const token = response.data;

    // Save token in AuthState
    const action: AuthAction = {
      type: AuthActionType.Register,
      payload: token,
    };
    authStore.dispatch(action);
  };

  const login = async (credentials: CredentialsModel): Promise<void> => {
    // Send credentials to server
    const response = await axios.post<string>(config.routes.login, credentials);

    // Extract token
    const token = response.data;

    // Save token in AuthState
    const action: AuthAction = {
      type: AuthActionType.Login,
      payload: token,
    };
    authStore.dispatch(action);
  };

  const logout = (): void => {
    // Delete token from AuthState
    const action: AuthAction = {
      type: AuthActionType.Logout,
    };
    authStore.dispatch(action);
  };

  return {
    register,
    login,
    logout,
  };
};

const authService = createAuthService();
export default authService;
