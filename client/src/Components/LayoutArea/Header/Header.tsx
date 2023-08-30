import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/userModel";
import { authStore } from "../../../Redux/AuthState";

function Header(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate()

    useEffect(() => {

        setUser(authStore.getState().user)
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        })

        return () => unsubscribe()

    }, [])

    return (
        <div className="Header">
            <h3>VACATIONS 🛫 </h3>

            <div className="user-data">
                {
                    !user &&
                    <>
                        <div className="login-out-wrapper">
                            <button
                                className="login-btn"
                                onClick={() => navigate("/login")}>
                                Login
                            </button>
                            <button
                                className="register-btn"
                                onClick={() => navigate("/register")}>
                                Register
                            </button>
                        </div>
                    </>
                }
                {
                    user &&
                    <>
                        <span>Hello</span>
                        <span className="span-name">{user.firstName + " " + user.lastName}</span>
                        <button className="sign-out-btn" onClick={() => navigate("/logout")}>Logout</button>
                    </>
                }
            </div>
        </div>
    );
}

export default Header;
