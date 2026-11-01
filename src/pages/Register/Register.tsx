import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../schemas/auth.schema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./../login/Login";
import type { boolean } from "zod";
 

export default function Register() {
  const navigate = useNavigate();
  const [Error, setError] = useState("");
const [IsLooding, setIsLooding] = useState(false)

  type RegisterData = {
    name: string;
    email: string;
    dateOfBirth: string;
    gender: "male" | "female";
    password: string;
    rePassword: string;
  };

  const form = useForm<RegisterData>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  let { register, handleSubmit, formState } = form;

  function handleRegister(values: RegisterData) {
 setIsLooding(true)
 
    axios
      .post(`https://route-posts.routemisr.com/users/signup`, values)
      .then(function (res) {
        if (res.data.success) {
          
          navigate("/Login");
        }
      })
      .catch(function (err) {
        setError(err.response.data.message)
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
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full h-12 bg-gray-50 border border-gray-200
                rounded-xl px-4 pr-11 text-sm outline-none
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10
                transition duration-200"
                />

                <i className="fa-solid fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                {formState.errors.name?.message && (
                  <p className="text-red-500">
                    
                    {formState.errors.name?.message}
                  </p>
                )}
              </div>
            </div>

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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                date
              </label>

              <div className="relative">
                <input
                  {...register(
                    "dateOfBirth",
                    //    , {
                    //   valueAsDate:false,
                    //   validate: function (params) {

                    //     const userDate= new Date(params).getUTCFullYear()
                    //     const nowDate= new Date().getFullYear()
                    //     return nowDate - userDate  > 10 ? true :"invalid date"

                    //   }
                    // }
                  )}
                  type="date"
                  id="date"
                  placeholder="Enter your date of birth"
                  className="w-full h-12 bg-gray-50 border border-gray-200
                rounded-xl px-4 pr-11 text-sm outline-none
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10
                transition duration-200"
                />

                <i className="fa-solid fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
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
                    //   , {
                    //   pattern:{value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,message:"password is required"}

                    // }
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  {...register(
                    "rePassword",
                    //   ,{
                    //   validate:function (repasswordValue) {
                    //     if (repasswordValue=== getValues("password") ) {
                    //       return true
                    //     }else{
                    //       return "password and repassword not match"
                    //     }
                    //   }
                    // }
                  )}
                  type="password"
                  id="repassword"
                  placeholder="Confirm your password"
                  className="w-full h-12 bg-gray-50 border border-gray-200
                rounded-xl px-4 pr-11 text-sm outline-none
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10
                transition duration-200"
                />

                <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                {formState.errors.rePassword?.message && (
                  <p className="text-red-500">
                    {" "}
                    {formState.errors.rePassword?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  gender
                </label>
                <div className="relative">
                  <input
                    {...register("gender")}
                    type="radio"
                    id="gender"
                    defaultValue="male"
                    className=""
                  />
                  <span className=" ps-2 text-sm font-medium text-gray-700 mb-2">
                    male
                  </span>
                  <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div className="relative">
                <input
                  {...register("gender")}
                  type="radio"
                  id="gender"
                  defaultValue="female"
                  className=""
                />
                <span className=" ps-2 text-sm font-medium text-gray-700 mb-2">
                  female
                </span>
                <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                {formState.errors.gender?.message && (
                  <p className="text-red-500">
                    {" "}
                    {formState.errors.gender?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
              />

              <p className="text-sm text-gray-500">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>
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
            {IsLooding? "loading...": "Register"}
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
            Already have an account?
            <a
              href="#"
              className="text-blue-600 font-semibold mr-1 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
