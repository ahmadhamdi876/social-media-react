import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  FaBirthdayCake,
 
  FaCalendarAlt,
  FaCamera,
  
 
  
  FaEnvelope,
  
  
  FaPen,
  
  FaRegComment,
  
  FaRegThumbsUp,
  FaShare,
 
  FaThumbsUp,
  FaUser,
  
  FaVenusMars,
} from "react-icons/fa";
import Loader from "../../components/loader/loader";
import { RiSignalWifiErrorLine } from "react-icons/ri";
import { useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import toast from "react-hot-toast";
import CreatePost from "../../components/CreatePost/CreatePost";
  

function Profile() {
 const q= useQueryClient()
const [isOpen, setisOpen] = useState<string | null>(null);  function myProfile() {
    return axios.get("https://route-posts.routemisr.com/users/profile-data", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  const { data ,isLoading,isError } = useQuery({
    queryKey: ["myProfile"],
    queryFn: myProfile,
  });

  const user = data?.data.data.user;
  
   
  
      function myPost() {
    return axios.get(`https://route-posts.routemisr.com/users/${user._id}/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
  const {data:myPostData ,isLoading:LoadingPost} =useQuery({
    queryKey: ["getUserPost"],
    queryFn:myPost,
    enabled:!isLoading && !isError&&!!data
  })
 

 const myPosts= myPostData?.data.data.posts

  function deletePost(postId:string){
  return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
    headers :{Authorization: `Bearer ${localStorage.getItem("token")}`}
  })
 }
 
 const {data :deleted , isPending , mutate }=useMutation({
  mutationFn:deletePost,
  onSuccess:(res)=> {
     toast.success(res.data.message)
 
    q.invalidateQueries({queryKey:["getUserPost"]})
  },
  onError:(err)=> {
    console.log("err");
     
    
  },
  onSettled: () => {}
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

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Profile Card */}
          <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            {/* Cover */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-r from-indigo-900 via-violet-700 to-pink-500 sm:h-64">
              <img
                src={user?.photo}
                alt="Cover"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              <button className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                <FaCamera />
                Edit Cover
              </button>
            </div>

            {/* User Info */}
            <div className="px-5 pb-7 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="-mt-14 flex justify-center sm:-mt-16">
                  <div className="relative">
                    <img
                      src={user?.photo}
                      alt="Profile"
                      className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-lg sm:h-40 sm:w-40"
                    />

                    <button className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-white">
                      <FaCamera size={13} />
                    </button>
                  </div>
                </div>

                <div className="min-w-0 flex-1 pb-1 text-center sm:pb-3 sm:text-left">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {user?.username}
                  </h1>

                  <p className="mt-1 text-slate-500">{user?.username}</p>

                  <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                    <FaUser size={12} />
                    {user?.gender}
                  </span>
                </div>

                <div className="pb-3">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-indigo-500 px-5 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white sm:w-auto">
                    <FaPen size={13} />
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Quick Statistics */}
              <div className="mt-7 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-100 pt-6 sm:ml-44 sm:max-w-xl">
                <div className="px-3 text-center sm:text-left">
                  <p className="text-2xl font-bold text-slate-900">{user?.
followersCount
} </p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Followers
                  </p>
                </div>

                <div className="px-3 text-center sm:text-left">
                  <p className="text-2xl font-bold text-slate-900">{user?.
followingCount} </p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Following
                  </p>
                </div>

                <div className="px-3 text-center sm:text-left">
                  <p className="text-2xl font-bold text-slate-900">{user?.bookmarksCount
}  </p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Bookmarks
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
             
            </aside>

            {/* Profile Details */}
            <main className="min-w-0 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <FaUser size={19} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your personal account details
                  </p>
                </div>
              </div>

              {/* Information Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm sm:p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FaEnvelope size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Email Address</p>
                    <p className="mt-2 break-words font-semibold text-slate-800">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm sm:p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <FaVenusMars size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Gender</p>
                    <p className="mt-2 font-semibold capitalize text-slate-800">
                      {user?.gender}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm sm:p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <FaBirthdayCake size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Date of Birth</p>
                    <p className="mt-2 font-semibold text-slate-800">
                      {user?.dateOfBirth.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm sm:p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <FaCalendarAlt size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Member Since</p>
                    <p className="mt-2 font-semibold text-slate-800">
                       {user?.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Statistics */}
              
            </main>
          </div>
        </div>
      </div>


      <CreatePost   />

{myPosts?.map((post)=> <div key={post.id} className="bg-white my-5 rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-2xl mx-auto mb-6">

  {/* Post Header */}
  <div className="flex items-center justify-between p-4">

    <div className="flex items-center gap-3">
      <img
        src= {post.user.photo}
        alt="User"
        className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
      />

      <div>
        <h3 className="font-bold text-gray-800 text-sm">
           {post.user.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
      {post.createdAt.split("T")[0]}
        </p>  
      </div>
    </div>

 

        <div className="relative">
   
     <>
       <HiDotsVertical
         className="cursor-pointer size-6 hover:bg-slate-200"
      onClick={() => setisOpen(isOpen === post._id ? null : post._id)}
       />
 
     
       { isOpen===post._id&&   ( <div className="bg-white p-2 rounded-xl absolute top-[120%] end-[-10px]  shadow-2xl border-2 border-slate-400">
           <ul>
             <li
               
  
             >
  <button     onClick={() => mutate(post._id)}       className="flex gap-2 items-center bg-slate-300 p-2 cursor-pointer disabled:bg-amber-950 disabled:cursor-not-allowed">
        <> Delete <MdDelete /></> 
 </button>
          
             </li>
 
             <li className="flex gap-2 items-center bg-slate-300 p-2 cursor-pointer">
               Edit <MdEdit />
             </li>
           </ul>
         </div>)
         }
       
     </>
   
 </div>
  </div>

  {/* Post Content */}
  <div className="px-4 pb-3">
    <p className="text-gray-700 text-sm leading-7">
  {post.body}
    </p>
  </div>

  {/* Post Image */}
  <div className="w-full">
    <img
      src= {post.image}
      
      className="w-full max-h-[450px] object-cover"
    />
  </div>

  {/* Likes & Comments Count */}
  <div className="px-4 py-3 flex items-center justify-between text-xs text-gray-500">

    <div className="flex items-center gap-2">

      <div className="flex -space-x-2">
        <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white text-white">
          <FaThumbsUp className="text-[10px]" />
        </span>

        
      </div>

      <span>{post.likesCount} Likes</span>
    </div>

    <span>|{post.commentCount} Comments</span>

  </div>

  <div className="border-t border-gray-100 mx-4"></div>

  {/* Post Actions */}
  <div className="grid grid-cols-3 px-3 py-2">

    <button className="flex items-center justify-center gap-2 py-3 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition">
      <FaRegThumbsUp className="text-lg" />
      <span className="text-sm font-semibold">Like</span>
    </button>

    <button className="flex items-center justify-center gap-2 py-3 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition">
      <FaRegComment className="text-lg" />
      <span className="text-sm font-semibold">Comment</span>
    </button>

    <button className="flex items-center justify-center gap-2 py-3 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition">
      <FaShare className="text-lg" />
      <span className="text-sm font-semibold">Share</span>
    </button>

  </div>

</div>)}
 
 
 
 
 
    </>
  );
}

export default Profile;
