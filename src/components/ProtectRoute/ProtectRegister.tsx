
import { useNavigate,Navigate } from "react-router-dom";
 
import Home from './../../pages/Home/Home';



export default function ProtectRegister(props) {

const navigate=useNavigate()

    if (localStorage.getItem("token")) {
        return <Navigate to={"/home"}/>

    }else{
        return  <>{props.children}</>
    }
}