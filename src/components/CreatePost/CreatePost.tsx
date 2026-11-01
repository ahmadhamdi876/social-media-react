import { FiImage, FiSend } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
 
import { useRef, useState } from "react";
 
import  axios  from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner6 } from "react-icons/im";
import toast from "react-hot-toast";


 export default function CreatePost(){
const queryClient = useQueryClient();

const [isUploaded, setisUploaded] = useState("")
 
const formData =new FormData()
 
const textInput = useRef(null)
const imgaInput = useRef(null)


function createPost(){
return axios.post(`https://route-posts.routemisr.com/posts` , formData ,{
  headers:{Authorization: `Bearer ${localStorage.getItem("token")} `}
})
}

const {data ,isPending,mutate} =useMutation({
  mutationFn:createPost,
  onSuccess:()=>{

    toast.success("created post successfully")
textInput.current.value=""
imgaInput.current.value=""
setisUploaded("");

queryClient.invalidateQueries({
  queryKey:["getAllPosts"],
})

  },
  onError:(err)=>{      toast.error("created post failed")
},
  onSettled:()=>{}
})

console.log(data);

 


function handleCreatPost(){
if (textInput.current.value==="" && imgaInput.current.value==="") return

if(textInput.current.value){
formData.append("body",textInput.current!.value )
}
if (imgaInput.current.value) {
   formData.append("image",imgaInput.current?.files[0])
};
mutate()
}

function handleImage(e){
 

const path= URL.createObjectURL(e.target.files[0])
 setisUploaded(path)

}

return(

<>
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Input 1: text content */}
      <label htmlFor="post-content" className="sr-only">
        Post content
      </label>
      <textarea
      ref={textInput}
        id="post-content"
        rows={4}
        placeholder="What do you want to share?"
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
      />
 {isUploaded &&   <div className="relative">
        <img src={isUploaded} alt="" />
        <IoMdCloseCircle onClick={()=> setisUploaded("")} className="absolute top-[10px] end-[10px] text-2xl text-gray-800 " /> </div>}
      {/* Input 2: image upload */}
      <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-slate-400 focus-within:ring-2 focus-within:ring-teal-600/30">
        <FiImage size={28} className="text-slate-500" aria-hidden />
        <span className="text-sm font-medium text-slate-700">Add an image</span>
        <span className="text-xs text-slate-500">
          Drag and drop, or click to browse
        </span>
        <input ref={imgaInput} type="file" accept="image/*" className="sr-only" onChange={handleImage} />
      </label>
 
      <div className="mt-4 flex justify-end">
        <button onClick={() =>handleCreatPost()}
disabled={isPending}
          type="submit"
          className="disabled:bg-amber-900 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
        {isPending? ( <ImSpinner6 className="animate-spin" />)
:  (  <>

 <FiSend size={16} aria-hidden />  create post
</> )}
        </button>
      </div>
    </div>
  
  

</>

)


}



 

  