/*https://youtu.be/X8eAbu1RWZ4 don't forget to watch => how protect routes !!  */

import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthState";

interface RequireAuthRouting {
    children: JSX.Element//javascript XML Element(HTML)
}

function RequireAuthAdmin(authElement: RequireAuthRouting): JSX.Element {

    const location = useLocation()
   
    return (
        authStore.getState().token ? authElement.children : <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}

export default RequireAuthAdmin