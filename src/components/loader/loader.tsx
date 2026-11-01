import React from 'react'
import {Oval} from "react-loader-spinner"
export default function Loader() {
  return (
   <>
    <div className=' w-full     flex justify-center items-center'>
<Oval
visible={true}
height="80"
width="80"
color="#4fa94d"
ariaLabel="oval-loading"
wrapperStyle={{}}
wrapperClass=""
/>
  </div>
   </>
  )
}
