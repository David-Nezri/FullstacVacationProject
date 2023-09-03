import config from "../../../Utils/Config";
import "./Spinner.css";


function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={config.serverStaticsGifs + "loading.gif"} />
        </div>
    );
}

export default Spinner;
