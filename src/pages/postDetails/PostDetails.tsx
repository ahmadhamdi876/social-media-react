import React from 'react'
import  axios  from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from './../../components/loader/loader';
import { RiSignalWifiErrorLine } from 'react-icons/ri';
import { useParams, Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import AllComment from '../../components/allComment/AllComment';
import CreateComment from './../../components/createComment/CreateComment';
 

export default function PostDetails() {





const {id}= useParams()
  function getPostDetails() {
 return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
headers:{
Authorization:   `Bearer ${localStorage.getItem("token")}`
},
  }) 
 }


 
  const {data,isLoading,isError,error ,isFetching}=useQuery({
   queryKey: ["getSinglePost",id],
   queryFn: getPostDetails,
 
 
 })
 
  const post =data?.data.data.post
 
 
  
 
 
 
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
 


  return  <>
 
   <div className="min-h-screen bg-gray-100 px-4 py-8">
    <div className="mx-auto max-w-2xl">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Post Details
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View post and interact with the community.
        </p>
      </div>

      {!post ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Post not found.</p>
        </div>
      ) : (
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Post Header */}
          <div className="flex items-center gap-3 p-5">
            <img
              src={post.user?.photo}
              alt={post.user?.name || "User"}
              className="h-12 w-12 rounded-full border border-gray-200 object-cover"
            />

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-bold text-gray-800">
                {post.user?.name}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {post.privacy}
            </span>
          </div>

          {/* Post Body */}
          <div className="px-5 pb-5">
            <p className="whitespace-pre-wrap break-words text-base leading-7 text-gray-700">
              {post.body}
            </p>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="border-y border-gray-100">
              <img
                src={post.image}
                alt="Post"
                className="max-h-[500px] w-full object-contain"
              />
            </div>
          )}

          {/* Post Statistics */}
          <div className="flex items-center justify-between px-5 py-4 text-sm text-gray-500">
            <span>👍 {post.likesCount} Likes</span>
            <span>{post.commentsCount} Comments</span>
            <span>{post.sharesCount} Shares</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 border-t border-gray-200 px-2 py-2">
            <button
              type="button"
              className="rounded-lg py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              <AiFillLike className="mr-2 inline-block text-lg" />
              Like
            </button>

            <button
              type="button"
              className="rounded-lg py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              <FaCommentDots className="mr-2 inline-block text-lg" />
              Comment
            </button>

            <button
              type="button"
              className="rounded-lg py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              <FaShare className="mr-2 inline-block text-lg" />
              Share
            </button>
          </div>

        </article>



      )}

      <CreateComment   />

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


<AllComment  _id ={post._id} />
    </div>
  </div>
  
  </>
   
}
