import { useNavigate } from "react-router-dom";
import config from "../../../Utils/Config";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {

    const navigate = useNavigate()
    return (
        <div className="PageNotFound">
            <img src={config.serverStaticsGifs + "404.gif"} />
            <button
                className="btn"
                onClick={() => navigate("/home")}>
                Go Back 
            </button>
        </div>
    );
}

export default PageNotFound;
