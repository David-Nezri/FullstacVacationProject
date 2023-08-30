import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import validateDate from "../ValidateDate/ValidateDate";
import "./AddVacation.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue, getValues } = useForm<VacationModel>()
    const navigate = useNavigate()
    const [image, setImage] = useState<string>()
    const [sDate, setSDate] = useState<string>('')

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation)

            // notify message
            notifyService.success("Vacation has added successfully")

            // Redirect to home page
            navigate("/home")

        } catch (err: any) {

            // notify message
            notifyService.success(err)
        }
    }

    function setDate(e: React.FormEvent<HTMLInputElement>) {
        setSDate(e.currentTarget.value)        
    }

    function onImageChange(e: React.FormEvent<HTMLInputElement>) {
        const files = e.currentTarget.files
        const file = files[0]
        setImage(URL.createObjectURL(file))
    }

    return (
        <div className="AddVacation">
            <div className="action-nav">
                <button onClick={() => navigate('/home')}>
                    <ChevronLeftIcon sx={{ color: "inherent", fontSize: 16, marginRight: "8px" }} />
                    Back
                </button>
            </div>
            <form onSubmit={handleSubmit(send)}>
                <h2>Add Vacation</h2>
                <div className="input-label-wrapper">
                    <label htmlFor="destination">destination</label>
                    <input type="text" id="destination" {...register("destination", {
                        required: { value: true, message: "Destination is required" },
                        minLength: { value: 2, message: "Destination is too short" },
                        maxLength: { value: 50, message: "Destination is too long" }
                    })} />
                    <span className="hint">{formState.errors.destination?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="description">description</label>
                    <textarea id="description" {...register("description", {
                        required: { value: true, message: "Description is required" },
                        minLength: { value: 2, message: "Description is too short" },
                        maxLength: { value: 1000, message: "Description is too long" }
                    })} />
                    <span className="hint">{formState.errors.description?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="startDate">start on</label>
                    <input
                        min={validateDate.disablePastDate(0)}
                        type="date"
                        id="startDate"
                        onInput={(e) => setDate(e)}
                        {...register("startDate", {
                            required: { value: true, message: "Start date is required" },
                            minLength: { value: 8, message: "Start date is too short" },
                            maxLength: { value: 100, message: "Start date is too long" }
                        })} />
                    <span className="hint">{formState.errors.startDate?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="endDate">end on</label>
                    <input
                        min={sDate}
                        type="date"
                        id="endDate"
                        {...register("endDate", {
                            required: { value: true, message: "End date is required" },
                            minLength: { value: 8, message: "End date is too short" },
                            maxLength: { value: 100, message: "End date is too long" },
                        })} />
                    <span className="hint">{formState.errors.endDate?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="price">price</label>
                    <input type="number" id="price" step="0.01"{...register("price", {
                        required: { value: true, message: "Price is required" },
                        min: { value: 0, message: "Price can't be negative" },
                        max: {value: 9999.99, message: "Price must be under 9999.99"},
                    })} />
                    <span className="hint">{formState.errors.price?.message}</span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="image" id="imgLabel">
                        
                        <div
                            className={image ? "image-change" : "image-change no-image"}
                            style={image && { backgroundImage: `url(${image})` }}
                        >
                            <span>
                                {image ? "Change Image" : "Select Image"}
                            </span>
                        </div>
                    </label>
                    <input type="file" id="image" accept="image/*" {...register("image", {
                        required: { value: true, message: "Image required" }
                    })} onChange={onImageChange} />
                    <span className="hint">{formState.errors.image?.message}</span>
                </div>
                <button>Add Vacation</button>
                <button
                    className="secondary"
                    onClick={() => navigate("/home")}
                >
                    Cancel
                </button>
            </form>

        </div>
    );
}

export default AddVacation;
