import { Calculate, Close, ThumbUp } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
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
import usePageTitle from "../../../Utils/usePageTitle";
import Spinner from "../../SharedArea/Spinner/Spinner";
import Vat from "../../UserUtilsArea/Vat/Vat";
import TotalVacations from "../TotalVacations/TotalVacations";
import VacationCard from "../VacationCard/VacationCard";
import "./Vacations.css";
import TotalOutOfStock from "../TotalOutOfStock/TotalOutOfStock";


function Vacations(): JSX.Element {

    usePageTitle("Vacations");

    const navigate = useNavigate()
    const pageSize = config.numOfVacationsOnPage
    const [fetchVacations, setFetchVacations] = useState<VacationForUserModel[]>([])
    const [vacationsToDisplay, setVacationsToDisplay] = useState<VacationForUserModel[]>([])
    const [pagination, setPagination] = useState({ count: 0,from: 0, to: pageSize})
    const [isFiltered, setIsFiltered] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    setFetchVacations(result)

                }).catch(err => {
                    notifyService.error(err)
                    if (err.response?.data === "You are not logged in"){
                        navigate("/logout")
                    }
                })
        } else {
            setFetchVacations(fetchVacations.filter(v => v.isFollowing === 1))
        }
    }, [isFiltered])

    useEffect(() => {

        // how many vacations there are in the state
        const vacationsLength = fetchVacations.length

        //  which vacation to display
        const vacationsOnPage = fetchVacations.slice(pagination.from, pagination.to)

        // Set vacation count in state
        setPagination({ ...pagination, count: vacationsLength })

        // Set relevant vacation to display
        setVacationsToDisplay(vacationsOnPage)

        // If vacation store changed then repeat 
        const unsubscribe = vacationsStore.subscribe(() => {
            setFetchVacations(vacationsStore.getState().vacations)
            const vacationsLength = fetchVacations.length
            const vacationsOnPage = fetchVacations.slice(pagination.from, pagination.to)
            setPagination({ ...pagination, count: vacationsLength })
            setVacationsToDisplay(vacationsOnPage)
        })

        // Unsubscribe from vacation store
        return () => unsubscribe()

        // Repeat each time local states are change
    }, [fetchVacations, pagination.from, pagination.to])

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

         {
            authStore.getState().user.roleId !== 1 &&
                 
            <div className="admin-wrapper"> 
                
                <button onClick={handleClickOpen} ><Calculate sx={{ color: "blue", fontSize: 30, marginRight: "8px", cursor: "pointer" }}/>Vat Calc</button>
                <Dialog 
                    open={open}
                    onClose={handleClose}
                >
                    <DialogActions>
                        <span><Close onClick={handleClose} sx={{ color: "inherent", fontSize: 30, marginRight: "18px" , cursor: "pointer" }}/> </span>
                    </DialogActions>

                    <DialogTitle >
                    <span ><Vat percent={17}/></span>
                    </DialogTitle>
                  
                </Dialog>
            </div>
               
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
                        <span><TotalVacations/></span>
                        <span><TotalOutOfStock/></span>
                    </div>
                }
            </div>
            <div className="vacations-align">



                <div className="vacations-wrapper">
                {/* loading gif  */}
                {fetchVacations.length === 0 && <Spinner />}
                    {
                        vacationsToDisplay.map(v =>
                            <VacationCard key={v.vacationId} vacationData={v} />
                        )
                    }
                </div>
            </div>
            <div className="pagination-wrapper">
                <Pagination count={Math.ceil(fetchVacations.length / pageSize)}
                    onChange={handlePageChange} variant="outlined" shape="rounded" />
            </div>
        </div>
    );
}

export default Vacations;
