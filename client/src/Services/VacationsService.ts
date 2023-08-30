import axios from "axios";
import {FollowerModel} from "../Models/followerModel";
import ReportDataModel from "../Models/reportDataModel";
import VacationForUserModel from "../Models/vacationForUserModel";
import VacationModel from "../Models/vacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import config from "../Utils/Config";
import notifyService from "./NotifyService";

// Define the vacationService object
const vacationService = {
  // Method to get all vacations for a specific user
  getAllVacations: async (userUuid: string): Promise<VacationForUserModel[]> => {
    const response = await axios.get<VacationForUserModel[]>(
      config.routes.getAllVacations + userUuid
    );
    const vacations = response.data;
    const action: VacationsAction = {
      payload: vacations,
      type: VacationsActionType.FetchVacations,
    };
    vacationsStore.dispatch(action);
    return vacations;
  },

  // Method to get a specific vacation by ID
  getVacation: async (vacationId: number): Promise<VacationModel> => {
    const response = await axios.get<VacationModel[]>(
      config.routes.getVacation + vacationId
    );
    const vacations = response.data;
    const vacation: VacationModel = vacations[0];
    return vacation;
  },

  // Method to add a follower to a vacation
  addFollower: async (
    userUuid: string,
    vacation: VacationForUserModel
  ): Promise<FollowerModel> => {
    try {
    //   const follower = new FollowerModel({
    //     userUuid: userUuid,
    //     vacationId: vacation.vacationId,
    //   });
    const follower: FollowerModel = {
        userUuid: userUuid,
        vacationId: vacation.vacationId,
      };
      const response = await axios.post<FollowerModel>(
        config.routes.addFollower,
        follower
      );
      const addedFollower = response.data;
      vacation.followersCount++;
      vacation.isFollowing = 1;
      const action: VacationsAction = {
        type: VacationsActionType.UpdateVacation,
        payload: vacation,
      };
      vacationsStore.dispatch(action);
      return addedFollower;
    } catch (err: any) {
      // Handle errors and notify users
      notifyService.error(err);
      throw err;
    }
  },

  // Method to remove a follower from a vacation
  removeFollower: async (
    userUuid: string,
    vacation: VacationForUserModel
  ): Promise<void> => {
    try {
    //   const follower = new FollowerModel({
    //     userUuid: userUuid,
    //     vacationId: vacation.vacationId,
    //   });
    const follower: FollowerModel = {
        userUuid: userUuid,
        vacationId: vacation.vacationId,
      };
      
      await axios.delete<void>(config.routes.removeFollower, {
        data: follower,
      });
      vacation.followersCount--;
      vacation.isFollowing = 0;
      const action: VacationsAction = {
        type: VacationsActionType.UpdateVacation,
        payload: vacation,
      };
      vacationsStore.dispatch(action);
    } catch (err: any) {
      // Handle errors and notify users
      notifyService.error(err);
      throw err;
    }
  },

  // Method to delete a vacation by ID
  deleteVacation: async (vacationId: number): Promise<void> => {
    await axios.delete(config.routes.deleteVacation + vacationId);
    const action: VacationsAction = {
      type: VacationsActionType.DeleteVacation,
      payload: vacationId,
    };
    vacationsStore.dispatch(action);
  },

  // Method to update a vacation's data
  updateVacation: async (vacation: VacationModel): Promise<void> => {
    // Prepare form data for updating
    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("startDate", vacation.startDate);
    formData.append("endDate", vacation.endDate);
    formData.append("price", vacation.price.toString());
    formData.append("image", vacation.image[0]);
    formData.append("imageName", vacation.imageName);

    // Send HTTP PUT request to update vacation
    const response = await axios.put<VacationModel>(
      config.routes.updateVacation + vacation.vacationId,
      formData
    );
    const updatedVacation = response.data;

    // Dispatch action to update Redux store
    const action: VacationsAction = {
      type: VacationsActionType.UpdateVacation,
      payload: updatedVacation,
    };
    vacationsStore.dispatch(action);
  },

  // Method to add a new vacation
  addVacation: async (vacation: VacationModel): Promise<void> => {
    // Prepare form data for adding
    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("startDate", vacation.startDate);
    formData.append("endDate", vacation.endDate);
    formData.append("price", vacation.price.toString());
    formData.append("image", vacation.image[0]);

    // Send HTTP POST request to add vacation
    const response = await axios.post<VacationModel>(
      config.routes.addVacation,
      formData
    );
    const addedVacation = response.data;

    // Dispatch action to update Redux store
    const action: VacationsAction = {
      type: VacationsActionType.AddVacation,
      payload: addedVacation,
    };
    vacationsStore.dispatch(action);
  },

  // Method to get report data related to vacations
  getReportData: async (): Promise<ReportDataModel[]> => {
    // Send HTTP GET request to retrieve report data
    const response = await axios.get<ReportDataModel[]>(
      config.routes.getReportData
    );
    // Filter out data with zero followers
    let vacationsData = response.data;
    vacationsData = vacationsData.filter((v) => v.followersCount !== 0);
    return vacationsData;
  },
};

// Export the vacationService object
export default vacationService;
