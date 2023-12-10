import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedAuth = ({ children }: { children: JSX.Element }) => {
    const token = Cookies.get("token");

    if (!token) return <Navigate to="/login"/>

    return children;
}

export default ProtectedAuth;