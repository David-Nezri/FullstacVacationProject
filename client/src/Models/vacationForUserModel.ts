import VacationModel from "./vacationModel";

interface VacationForUserModel extends VacationModel {
    isFollowing: number;
    followersCount: number;
}

export default VacationForUserModel;
