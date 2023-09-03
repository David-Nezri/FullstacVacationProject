import { ThumbUp } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Pagination from '@mui/material/Pagination';
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/userModel";
import VacationForUserModel from "../../../Models/vacationForUserModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import VacationCard from "../VacationCard/VacationCard";
import "./Vacations.css";
import usePageTitle from "../../../Utils/usePageTitle";

function Vacations(): JSX.Element {

    usePageTitle("Vacations");

    const navigate = useNavigate()
    const pageSize = config.numOfVacationsOnPage
    const [vacations, setVacations] = useState<VacationForUserModel[]>([])
    const [vacationsToDisplay, setVacationsToDisplay] = useState<VacationForUserModel[]>([])
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })
    const [isFiltered, setIsFiltered] = useState<boolean>(false)

    // Get all vacation for one user on load
    useEffect(() => {
        
        // Extract user object from token
        const container: { user: UserModel } = jwtDecode(authStore.getState().token)
        const user = container.user

        if (!isFiltered) {

            // Get vacation for user
            vacationsService.getAllVacations(user.userUuid)
                .then(result => {

                    // Set results in local state
                    setVacations(result)

                }).catch(err => {
                    notifyService.error(err)
                    if (err.response?.data === "You are not logged in"){
                        navigate("/logout")
                    }
                })
        } else {
            setVacations(vacations.filter(v => v.isFollowing === 1))
        }
    }, [isFiltered])

    useEffect(() => {

        // how many vacations there are in the state
        const vacationsLength = vacations.length

        //  which vacation to display
        const vacationsOnPage = vacations.slice(pagination.from, pagination.to)

        // Set vacation count in state
        setPagination({ ...pagination, count: vacationsLength })

        // Set relevant vacation to display
        setVacationsToDisplay(vacationsOnPage)

        // If vacation store changed then repeat 
        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations(vacationsStore.getState().vacations)
            const vacationsLength = vacations.length
            const vacationsOnPage = vacations.slice(pagination.from, pagination.to)
            setPagination({ ...pagination, count: vacationsLength })
            setVacationsToDisplay(vacationsOnPage)
        })

        // Unsubscribe from vacation store
        return () => unsubscribe()

        // Repeat each time local states are change
    }, [vacations, pagination.from, pagination.to])

    // Handle page change on pagination
    function handlePageChange(event: React.ChangeEvent<unknown>, page: number): void {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPagination({ ...pagination, from: from, to: to })
    }

    return (
        <div className="Vacations">
            <div className="action-nav">
                {
                    authStore.getState().user.roleId !== 1 &&
                <button
                className={isFiltered ? "active" : ""}
                onClick={() => isFiltered ? setIsFiltered(false) : setIsFiltered(true)}
                >
                      <ThumbUp sx={{ color: "blue", fontSize: 30, marginRight: "8px" }}
                    />
                    My Vacations
                </button>
                }
                {authStore.getState().user.roleId === 1 &&
                    <div className="admin-btn">
                        <button onClick={() => navigate('/add')}>
                            <AddIcon sx={{ color: "inherent", fontSize: 16, marginRight: "8px" }} />
                            Add Vacation
                        </button>
                        <button onClick={() => navigate('/report')}>
                            <LeaderboardIcon sx={{ color: "inherent", fontSize: 16, marginRight: "8px" }} />
                             Report
                        </button>
                    </div>
                }
            </div>
            <div className="vacations-align">
                <div className="vacations-wrapper">
                    {
                        vacationsToDisplay.map(v =>
                            <VacationCard key={v.vacationId} vacationData={v} />
                        )
                    }
                </div>
            </div>
            <div className="pagination-wrapper">
                <Pagination count={Math.ceil(vacations.length / pageSize)}
                    onChange={handlePageChange} variant="outlined" shape="rounded" />
            </div>
        </div>
    );
}

export default Vacations;
