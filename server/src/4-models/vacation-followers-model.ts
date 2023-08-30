import {VacationModel} from "./vacation-model";

interface VacationFollowersModel extends VacationModel{
     isFollowing: number;
     followersCount: number;

}

export default VacationFollowersModel;
