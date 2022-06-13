import{useContext} from "react";
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

export default function ProtectedRoutes() {
    const {auth} = useContext(AuthContext);

    return (
        auth.user ? <Outlet/> : <Navigate to="/login" replace={true} />
    )
}