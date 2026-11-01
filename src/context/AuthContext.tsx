 import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {jwtDecode} from "jwt-decode"

type AuthContextType ={

userLogin :string | null
setuserlogin:Dispatch<SetStateAction <string | null> >;
userId:string

}
 export const AuthContext=createContext <AuthContextType>({
    userLogin: null,
    setuserlogin: ()=> {},
    userId: ""
 })

export default function AuthContextProvider(props  :{children : ReactNode}) {

const [userLogin, setuserlogin] = useState(  function(){return localStorage.getItem("token")} )

const [userId, setuserId] = useState("")
 useEffect(()=> {
if (localStorage.getItem("token")) {
    const {user} :{user: string}= jwtDecode(localStorage.getItem("token"))
    setuserId(user)
 console.log(user);
 
}
 }, [userLogin]) 


    return <AuthContext.Provider value={{userLogin , setuserlogin ,userId}}>

{props.children}

    </AuthContext.Provider>
}