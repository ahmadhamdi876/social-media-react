
import { Link, useNavigate } from 'react-router-dom'
 
 import { FiAlignJustify } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import {  useContext, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { CgLogIn } from "react-icons/cg";
import { BiSolidRegistered } from "react-icons/bi";
import { AuthContext } from '../../context/AuthContext';

export default function Nav() {
  const [isOpen, setisOpen] = useState(false)
 
const {userLogin ,setuserlogin}= useContext(AuthContext)
 

const navigate = useNavigate();


function logOut() {
  localStorage.removeItem("token");
  setuserlogin(null);
   
  
  navigate("/login");

}


  return (
    <>
   <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-5 min-h-16 flex flex-wrap items-center justify-between">

    <div className="md:flex md:w-full md:justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          F
        </div>

        <span className="text-xl font-bold text-gray-800">
       Facebook
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-2">
 {userLogin ?  (<><Link
          to="home"
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
  <IoHome />
          Home
        </Link>

        <Link
          to="/profile"
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
       <FaUserCircle />
          Profile
        </Link>
        
        
           <button
 onClick={logOut}
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
 
        LogOut
        </button>
        
        </>):
  (
           <>
  <Link
          to="/login"
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
<CgLogIn />
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
        >
          <BiSolidRegistered />
          Register
        </Link>
  </> 
  ) }
   
 
   
    

       

        {/* Search */}
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 bg-gray-100 border border-transparent rounded-full py-2 pr-4 pl-10 text-sm outline-none focus:bg-white focus:border-blue-500 transition duration-200"
            />

            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

      </div>

    </div>

    {/* Mobile Menu Button */}
    <button
      onClick={() => setisOpen(!isOpen)}
      className="md:hidden w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center"
      aria-expanded={isOpen}
    >
      {!isOpen ? <FiAlignJustify /> : <FiX />}
    </button>

    {/* Mobile Menu */}
    <div className={`w-full md:hidden ${isOpen ? "block" : "hidden"}`}>
      <div className="flex flex-col items-stretch gap-2 px-2 pt-2 pb-3">

   {userLogin ?  (<><Link
          to="home"
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
  <IoHome />
          Home
        </Link>

        <Link
          to="/profile"
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
       <FaUserCircle />
          Profile
        </Link>
        
                
           <button
 onClick={logOut}
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
 
        LogOut
        </button>
        
        </>):
  (
           <>
  <Link
          to="/login"
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
<CgLogIn />
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
        >
          <BiSolidRegistered />
          Register
        </Link>
  </> 
  ) }

      </div>
    </div>

  </div>
</nav>
    
    
    
    
    
    </>
  )
}
