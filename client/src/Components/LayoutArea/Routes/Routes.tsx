 import {  useLocation } from "react-router-dom";
 import { useEffect, useState } from "react";
 import { Navigate, Route, Routes } from "react-router-dom";
 import { authStore } from "../../../Redux/AuthState";
 import Login from "../../AuthArea/Login/Login";
 import Logout from "../../AuthArea/Logout/Logout";
 import Register from "../../AuthArea/Register/Register";
 import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
 import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
 import Report from "../../VacationsArea/Report/Report";
 import Vacations from "../../VacationsArea/Vacations/Vacations";
 import PageNotFound from "../PageNotFound/PageNotFound";

/*https://youtu.be/X8eAbu1RWZ4 don't forget to watch => how protect routes !!  */

 interface RequireAuthRouting {
     children: JSX.Element//javascript XML
 }

 function RequireAuthAdmin(authElement: RequireAuthRouting): JSX.Element {

     const location = useLocation()
    
     return (
         authStore.getState().token ? authElement.children : <Navigate to="/login" replace state={{ path: location.pathname }} />
     );
 }
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
                 <Route path="/home" element={<RequireAuthAdmin children={<Vacations />} />} />

                 <Route path="/add" element={<RequireAuthAdmin children={<AddVacation />} />} />
                 <Route path="/edit/:vacationId" element={<RequireAuthAdmin children={<EditVacation />} />} />
                 <Route path="/report" element={<RequireAuthAdmin children={<Report />} />} />

                 
                 <Route path="/register" element={<Register />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/logout" element={<Logout />} />

                 <Route path="*" element={<PageNotFound />} />

             </Routes>
         </div>
     );
 }

 export default Routing;







