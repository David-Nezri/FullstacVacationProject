import { Close } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VacationForUserModel from "../../../Models/vacationForUserModel";
import { authStore } from "../../../Redux/AuthState";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import FollowBtn from "../FollowBtn/FollowBtn";
import "./VacationCard.css";



interface VacationCardProps {
    vacationData: VacationForUserModel;
}

function formatDate(date: string): string {
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString("he-IL");
    return formattedDate
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();
    
    const bgImage = {
        backgroundImage: `url(${config.serverStaticsImages + props.vacationData.imageName})`
    }
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        vacationsService.deleteVacation(props.vacationData.vacationId)
        setOpen(false);
    };


    return (
        <div className="VacationCard">
            <div
                className="bg-image"
                style={bgImage}
            >
                {
                    authStore.getState().user.roleId !== 1 &&
                    <FollowBtn vacation={props.vacationData} />
                    
                }


                {
                    authStore.getState().user.roleId === 1 &&
                    <div className="admin-wrapper">
                  
                        <span><DeleteIcon  onClick={handleClickOpen} sx={{ color: "inherent", fontSize: 30, marginRight: "18px", cursor: "pointer" }}/> </span>
                        <span><EditIcon  onClick={() => navigate('/edit/' + props.vacationData.vacationId)} sx={{ color: "inherent", fontSize: 30, marginRight: "18px", cursor: "pointer" }}/> </span>
                         
                        <Dialog 
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle >
                                {"Are you sure ?"}
                            </DialogTitle>
                          
                            <DialogActions>
                                <span><Close onClick={handleClose} sx={{ color: "inherent", fontSize: 30, marginRight: "18px" , cursor: "pointer" }}/> </span>
                                <span><DeleteIcon onClick={handleConfirm} sx={{ color: "inherent", fontSize: 30, marginRight: "18px" , cursor: "pointer" }}/> </span>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
                <h3>{props.vacationData.destination}</h3>
            </div>
            <div className="dates-wrapper">
                <EventIcon sx={{ fontSize: 18 }} />
                <span className="vacation-dates">
                    <span className="from-date">{formatDate(props.vacationData.startDate)
                        + " - " +
                        formatDate(props.vacationData.endDate)}
                    </span>
                </span>
                <div className="cards-placeholder"></div>
            </div>
            <div className="card-body">
                <p className="vacation-description">{props.vacationData.description}
                </p>
                <h4>${props.vacationData.price}</h4>
            </div>

        </div>
    );
   
}

export default VacationCard;
