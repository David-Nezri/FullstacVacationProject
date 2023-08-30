import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/credentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

interface LocationState {
    path: {
        pathname: string;
    };
}

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>()
    const navigate = useNavigate()
    const location = useLocation()
    const path = (location.state as LocationState)?.path

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials)

            // notify message
            notifyService.success("Welcome  " + credentials.username)

            // Redirect to home
            navigate(path || "/home")

        } catch (err: any) {
            // notify message
            notifyService.error(err)
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>
                <div className="input-label-wrapper">
                    <label htmlFor="username">username</label>
                    <input type="text" id="username" autoComplete="username" {...register("username", {
                        required: { value: true, message: "Username is required" },
                        minLength: { value: 4, message: "Username is too short" },
                        maxLength: { value: 50, message: "Username is too long" }
                    })} />
                    <span className="hint">{formState.errors.username?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" autoComplete="current-password" {...register("password", {
                        required: { value: true, message: "Password is required" },
                        minLength: { value: 4, message: "Password is too short" },
                        maxLength: { value: 50, message: "Password is too long" }
                    })} />
                    <span className="hint">{formState.errors.password?.message}</span>
                </div>
                <button>Login</button>
                <span>don't have account? <br />
                    <a onClick={() => navigate("/register")}>register now</a>
                </span>
            </form>
        </div>
    );
}

export default Login;
