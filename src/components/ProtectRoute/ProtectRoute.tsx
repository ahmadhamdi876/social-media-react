
import { useNavigate,Navigate } from "react-router-dom";
import Login from './../../pages/login/Login';



export default function ProtectedRoute(props) {

const navigate=useNavigate()

    if (!localStorage.getItem("token")) {
        return <Navigate to={"/Login"}/>

    }else{
        return  <>{props.children}</>
    }
}