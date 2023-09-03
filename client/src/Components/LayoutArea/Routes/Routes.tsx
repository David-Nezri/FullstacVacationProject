import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import ProtectRoutes from "./ProtectRoutes/ProtectRoutes";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Report from "../../VacationsArea/Report/Report";
import Vacations from "../../VacationsArea/Vacations/Vacations";
import PageNotFound from "../PageNotFound/PageNotFound";

 function Routing(): JSX.Element {
    
     const [isAuth, setIsAuth] = useState<string>()
    
     useEffect(() => {
         setIsAuth(authStore.getState().token)
     }, [])
    
     return (
         <div className="Routing">
             <Routes>

                 {/* Vacations page */}
                 <Route path="/" element={<Navigate to="/home" />} />                
                 <Route path="/home" element={<ProtectRoutes children={<Vacations />} />} />

                 <Route path="/add" element={<ProtectRoutes children={<AddVacation />} />} />
                 <Route path="/edit/:vacationId" element={<ProtectRoutes children={<EditVacation />} />} />
                 <Route path="/report" element={<ProtectRoutes children={<Report />} />} />

                 
                 <Route path="/register" element={<Register />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/logout" element={<Logout />} />

                 <Route path="*" element={<PageNotFound />} />

             </Routes>
         </div>
     );
 }

 export default Routing;







