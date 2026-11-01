import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from './../loader/loader';
import { RiSignalWifiErrorLine } from 'react-icons/ri';
 
export default function AllComment({_id}) {


 

function getAllComment() {
    return axios.get(`https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=20` ,  {
headers:{
Authorization:   `Bearer ${localStorage.getItem("token")}`
}, })
}


 
  const {data,isLoading,isError}=useQuery({
   queryKey: ["getAllComment",_id],
   queryFn: getAllComment,
 
 
 })

 
 if (isLoading) {
   return ( <Loader/>)
 }
 if (isError) {
   return  <>
   <div className='flex justify-center  '>
      <RiSignalWifiErrorLine className='w-100 text-6xl text-red-500  ' />
  
   </div>
   <div className='flex justify-center font-bold text-2xl text-red-500'>
     You Are Offline!!!
   </div>
   </>
 }
const comment=data?.data.data.comments

 
  return (
 <>
 
  

  { comment   && comment.map((comment)=> (  <div key={comment.id} className='px-3 m-4 bg-slate-300 flex rounded-4xl flex-col gap-3'>
 <div className='flex rounded-3xl p-3  bg-green-200'>
      <img src={comment?.commentCreator.photo} alt=""  className='w-10 h-10 rounded-xl'/>

<div className='ms-4'>
      <p className='text-gray-600'>{comment?.commentCreator.name } </p>
    <span>{comment?.createdAt}</span>
</div>
 </div>
 
 <div className='m-5'>
    {comment?.content}
 </div>
 <img src={comment?.image} alt=""  className='w-full h-125 object-cover object-center'/>
 
 </div>))  }
 
 </>
  )
}
