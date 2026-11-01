 import { IoSend } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation,  useQueryClient } from '@tanstack/react-query';
 import  { Comment } from 'react-loader-spinner'
import { toast } from "react-hot-toast";
 


export default function CreateComment({postId} :  {postId : string}) {


const form =useForm({
    defaultValues:{
        content:"",
        image:"",
    }
})
 const query= useQueryClient()

const {register , handleSubmit ,reset}=form

function createComment(){
    return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, formData , {
        headers:{
Authorization:   `Bearer ${localStorage.getItem("token")}`
},
    })
}

const {res ,isPending , mutate} =useMutation({
mutationFn:createComment,
onSuccess:()=>{
    toast.success("created comment successfully")
query.invalidateQueries( )

    reset()
},
onError:()=>{      toast.error("created comment failed")
},
onSettled:()=>{}
})


const formData= new FormData()

function handleCreateComment(values : {content: string , image:string }){
if (!values.content && !values.image) {
    return
}
 if (values.content) {
    formData.append("content", values.content)

 }if (values.image) {
     formData.append("image", values.image[0])

 }

 mutate()
 }

  return (
    <>
    <form className="max-w-sm mx-auto mb-5"  onSubmit={handleSubmit(handleCreateComment)}>
  <label htmlFor="message" className="block mb-2.5 text-sm font-medium text-heading">   </label>
 <div className='flex  gap-5'>
      <input {...register("content")} id="message"  type="text" className="rounded-xl    bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="send comment here..." defaultValue={""} />


  <button disabled={isPending} type='submit' className='bg-blue-500 px-5 text-sky-50 font-bold rounded-xl cursor-pointer '>
    {isPending ? <Comment
visible={true}
height="50"
width="50"
ariaLabel="comment-loading"
wrapperStyle={{}}
wrapperClass="comment-wrapper"
color="#fff"
backgroundColor="#F4442E"
/> :  <IoSend />}
 
</button>
 </div>

 
    <label htmlFor="img" className='bg-sky-300 flex justify-center mt-3 rounded-2xl' >
 <FaImage className='text-2xl text-sky-900  cursor-pointer' />

    <input type="file"  id='img' hidden {...register("image")} />
</label>
 

</form>
    
    </>
  )
}
