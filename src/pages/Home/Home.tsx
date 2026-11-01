 
import axios  from 'axios';
 import type { PostType } from '../../types/post.type';
 
import { AiFillLike } from "react-icons/ai";
 import { FaCommentDots } from "react-icons/fa";
 import { FaShare } from "react-icons/fa";
import Loader from '../../components/loader/loader';
 import { RiSignalWifiErrorLine } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import CreateComment from '../../components/createComment/CreateComment';
 import CreatePost from '../../components/CreatePost/CreatePost';
import { Helmet } from 'react-helmet-async';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaSpinner } from "react-icons/fa";
import { toast } from 'react-hot-toast';

 

 

 
export default function Home() {
 
  const query=useQueryClient()
const [isOpen, setisOpen] = useState<string | null>(null);
  function getAllPosts() {
 return axios.get( 'https://route-posts.routemisr.com/posts?sort=-createdAt', {
headers:{
Authorization:   `Bearer ${localStorage.getItem("token")}`
},
  }) 
 }
 const {data,isLoading,isError,error ,isFetching}=useQuery({
  queryKey: ["getAllPosts"],
  queryFn: getAllPosts,


})
 

 
 
 
 
 
 
 
const {userId :LoginUserId}=useContext(AuthContext)
 function deletePost(postId:string){
  return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
    headers :{Authorization: `Bearer ${localStorage.getItem("token")}`}
  })
 }
 
 const {data :deleted , isPending , mutate}=useMutation({
  mutationFn:deletePost,
  onSuccess:(res)=> {
 toast.success(res.data.message)
    query.invalidateQueries({queryKey:["getAllPosts"]})
  },
  onError:(err)=> {
    console.log("err");
    //  toast.error(err.data.message)
    
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

<Helmet>


<title>Home</title>

</Helmet>
    
<CreatePost/>


   <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden font-sans mt-5 mb-5 flex flex-col gap-5">
 {data?.data.data.posts.map((post :PostType)=>    <div key={post.id} className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden font-sans">

      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="text-gray-500  rounded-full p-2">

       <div className="relative">
  {LoginUserId === post.user._id && (
    <>
      <HiDotsVertical
        className="cursor-pointer size-6 hover:bg-slate-200"
        onClick={() =>
          setisOpen(isOpen === post._id ? null : post._id)
        }
      />

      {isOpen === post._id && (
        <div className="bg-white p-2 rounded-xl absolute top-[120%] end-[-100px] shadow-2xl border-2 border-slate-400">
          <ul>
            <li
              onClick={() => mutate(post._id)}
 
            >
 <button     disabled={isPending}          className="flex gap-2 items-center bg-slate-300 p-2 cursor-pointer disabled:bg-amber-950 disabled:cursor-not-allowed">
              {isPending? <FaSpinner className='animate-spin'/>
:      <> Delete <MdDelete /></> }
</button>
         
            </li>

            <li className="flex gap-2 items-center bg-slate-300 p-2 cursor-pointer">
              Edit <MdEdit />
            </li>
          </ul>
        </div>
      )}
    </>
  )}
</div>

           </button>

 
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
      
            <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mt-1">
               
              <div className=' flex flex-col'>
                  <span className='mb-5 text-l font-bold'> {post.user.name} </span>
                     <span> {post.createdAt} </span>
              </div>
               
                <img src={post.user.photo} alt=""  className='w-10 h-10 rounded-xl'/>
                    
             </div>
          <p>{post.body} </p>
          
   
          </div>
 
        </div>
      </div>

      {/* Post Content */}
      <div className="w-full     flex items-center justify-center px-5">
    <img src={post.image} alt="" className='w-full  h-100 ' />
      </div>

      {/* Reactions and Comments */}
      <div className="px-3 pt-2 pb-1">
        <div className="flex items-center justify-around text-sm text-gray-500 pb-2">

          
          <span className='font-bold'> {post.sharesCount} </span>
          <span className='font-bold '> {post.commentsCount} </span>
        
 <span className=' font-bold '>{post.likesCount}  </span>
        
           
        </div>

        <div className="border-t border-gray-200 grid grid-cols-3 py-1 bg-sky-200">
          <button className="flex items-center justify-center gap-2 py-2 text-gray-500 font-semibold hover:bg-gray-100 rounded-md transition-colors">
     
            <span className="text-sm font-bold cursor-pointer">share</span>
            <FaShare/>

          </button>
 <Link to = {`/postdetails/${post._id}  `} className='ms-15'>
 
          <button className="flex items-center justify-center gap-2 py-2 text-gray-500 font-semibold hover:bg-gray-100 rounded-md transition-colors">
            
            <span className="text-sm font-bold cursor-pointer">comment  </span>
            <FaCommentDots />
          </button>
 </Link>

          <button className="flex items-center justify-center gap-2 py-2 text-gray-500 font-semibold hover:bg-gray-100 rounded-md transition-colors">
         
            <span className="text-sm font-bold cursor-pointer">like  </span>
             <AiFillLike />
          </button>
        </div>
      </div>

         
      
 {post.topComment &&   <div className='px-3 m-4 bg-slate-300 flex rounded-4xl flex-col gap-3'>
 <div className='flex rounded-3xl p-3  bg-green-200'>
      <img src={post.topComment?.commentCreator.photo} alt=""  className='w-10 h-10 rounded-xl'/>

<div className='ms-4'>
      <p className='text-gray-600'>{post.topComment?.commentCreator.name} </p>
    <span>{post.topComment?.createdAt}</span>
</div>
 </div>
 
 <div className='m-5'>
    {post.topComment?.content}
 </div>
 
 </div>}
 <CreateComment   postId={post._id} />
    </div>
  
 


  
  )}
  
    </div>

   
 </>
  
  )
}
