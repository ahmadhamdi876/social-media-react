 import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { loginSchema ,type loginSchemaType } from "../../schemas/auth.schema";
import { AuthContext } from "../../context/AuthContext";
 

 

export default function Login() {
  const navigate = useNavigate();
  const [Error, setError] = useState("");
const [IsLooding, setIsLooding] = useState(false)
const [loading, setloading] = useState(false)
 const {userLogin , setuserlogin}=useContext(AuthContext)


 

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  let { register, handleSubmit, formState } = form;

 
 
  function handleLogin(values:loginSchemaType ) {
 setIsLooding(true)
 
    axios
      .post(`https://route-posts.routemisr.com/users/signin`, values)
      .then(function (res) {
        if (res.data.success) {
 
    localStorage.setItem("token" ,res.data.data.token)
  setuserlogin(res.data.data.token)
          navigate("/home");
        }
      })
      .catch(function (error) {
        setError(error.response.data.message)

          if (axios.isAxiosError(error)) {
    if (error.response) {
      // السيرفر ردّ بخطأ مثل 400 أو 401
      console.log("API Error:", error.response.data);
      setError(error.response.data.message || "Login failed");
    } else if (error.request) {
      // الطلب اتبعت، لكن مفيش استجابة من السيرفر
      console.log("Network Error:", error.message);
      setError("Cannot connect to the server. Please try again.");
    } else {
      console.log("Request Error:", error.message);
      setError("Something went wrong.");
    }
  } else {
    console.log("Unexpected Error:", error);
    setError("An unexpected error occurred.");
  }
      }).finally(()=>
        {setIsLooding(false)})
  }
 
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        {/* Register Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
              S
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              Create Account
            </h1>
 
            <p className="text-gray-500 text-sm mt-2 text-center">
              Join Socially and connect with people around you
            </p>


            {Error&&      <p className="bg-red-500 text-white text-center font-bold p-2 rounded-sm w-[300px] mx-auto ">{Error}</p>}

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
      
         {
        
         } 

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full h-12 bg-gray-50 border border-gray-200
                rounded-xl px-4 pr-11 text-sm outline-none
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10
                transition duration-200"
                />

                <i className="fa-solid fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                {formState.errors.email?.message && (
                  <p className="text-red-500">
                    {" "}
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>
            </div>
          

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  {...register(
                    "password",
                    
                  )}
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full h-12 bg-gray-50 border border-gray-200
                rounded-xl px-4 pr-11 text-sm outline-none
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10
                transition duration-200"
                />

                <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                {formState.errors.password?.message && (
                  <p className="text-red-500">
                    {" "}
                    {formState.errors.password?.message}
                  </p>
                )}
              </div>
            </div>

         
            

        
       

            {/* Register Button */}
            <button

          disabled={IsLooding}
              type="submit"
              className="w-full h-12 bg-blue-600 text-white
            rounded-xl font-semibold
            hover:bg-blue-700
            hover:shadow-lg hover:shadow-blue-500/20
            active:scale-[0.98]
            transition duration-200 disabled:bg-slate-900 disabled:cursor-not-allowed"
            >
            {IsLooding? "loading...": "login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-gray-400 text-sm">OR</span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button
            className="w-full h-12 border border-gray-200
          rounded-xl flex items-center justify-center gap-3
          text-gray-700 font-medium
          hover:bg-gray-50 transition duration-200"
          >
            <i className="fa-brands fa-google text-red-500"></i>
            Continue with Google
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
            <a
            href="/Register"
              className="text-blue-600 font-semibold mr-1 hover:underline"
            >
              Register 
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
