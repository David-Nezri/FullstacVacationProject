import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { VacationsState } from "../../../Redux/VacationsState";
import "./TotalOutOfStock.css";

function TotalOutOfStock(): JSX.Element {

    const count: number = +useSelector<VacationsState>(productsState => {
        return productsState.vacations.filter(p => +p.stock === 0).length;
    });

    const dispatch = useDispatch(); // not in use in this component...

    return (
        <div className="TotalOutOfStock Box">
            <span>Total out of Stock: {count}</span>
        </div>
    );
}

export default TotalOutOfStock;
