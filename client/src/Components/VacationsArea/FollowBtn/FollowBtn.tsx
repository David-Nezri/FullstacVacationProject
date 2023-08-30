import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/userModel";
import VacationForUserModel from "../../../Models/vacationForUserModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./FollowBtn.css";
import { ThumbDownOffAlt, ThumbUp } from "@mui/icons-material";


interface FollowBtnProps {
    vacation: VacationForUserModel;
}

function FollowBtn(props: FollowBtnProps): JSX.Element {

    const [isFollow, setIsFollow] = useState<number>(0)
    const [followersCount, setFollowersCount] = useState<number>(0)
    const [vacation, setVacation] = useState<VacationForUserModel>(null)
    const [user, setUser] = useState<UserModel>(null)

    useEffect(() => {
        setVacation(props.vacation)
        setFollowersCount(props.vacation.followersCount)
        setIsFollow(props.vacation.isFollowing)
        const container: { user: UserModel } = jwtDecode(authStore.getState().token);
        const user = container.user;
        setUser(user)
    }, [])

    function handleFollow() {
        try {
            if (vacation.isFollowing === 0) {
                setIsFollow(1)
                setFollowersCount(followersCount + 1)
                vacationsService.addFollower(user.userUuid, vacation)
            } else {
                setIsFollow(0)
                setFollowersCount(followersCount - 1)
                vacationsService.removeFollower(user.userUuid, vacation)
            }
        } catch (err: any) {
            notifyService.error(err)
        }
    }

    return (
       
        <div className="FollowBtn" onClick={handleFollow}>
        {
            vacation &&
            <>
                <div className={"content like-active"}>
                    <span className={"text like-active "} >{ followersCount }</span>
                    <span >{isFollow === 0 ?  <ThumbDownOffAlt sx={{ color: "inherent", fontSize: 30, marginRight: "18px" }}/> :
                           <ThumbUp sx={{ color: "blue", fontSize: 30, marginRight: "18px" }}/> }</span>
                </div>
            </>
        }
    </div>
    );
}

export default FollowBtn;
