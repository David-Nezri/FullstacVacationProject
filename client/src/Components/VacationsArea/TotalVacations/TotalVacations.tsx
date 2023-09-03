import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/VacationsState";
import "./TotalVacations.css";

function TotalVacations(): JSX.Element {

    const [count, setCount] = useState<number>();

    useEffect(() => {
        setCount(vacationsStore.getState().vacations.length);
        const unsubscribe = vacationsStore.subscribe(() => setCount(vacationsStore.getState().vacations.length));
        return () => unsubscribe();
    }, []);

    return (
        <div className="total-vacations">
            <span>Total vacations: {count}</span>
        </div>
    );
}

export default TotalVacations;
