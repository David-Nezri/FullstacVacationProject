import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";


function Logout(): JSX.Element {

    const navigate = useNavigate()
    
    useEffect(() => {
        try {
            authService.logout()

            // notify message
            notifyService.success("have a nice day !")

            // Redirect to login page
            navigate("/login")

        } catch (err: any) {
            // notify message
            notifyService.error(err)
        }
    }, [])

    return null;
}

export default Logout;
