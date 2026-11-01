
import * as zod from "zod";

 export const schema = zod.object({
    name: zod.string().nonempty("name is required").min(3,"min length is 3 chars").max(20,'max length is 20 chars'),


  email:zod.email().nonempty("email is requried").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"),
  dateOfBirth:zod.string().nonempty("date is required").refine((dateOfBirthValue)=>{
    const userDate=new Date(dateOfBirthValue).getFullYear()
    const nowDate=new Date().getFullYear()
    return nowDate - userDate >10? true :false
  },"date should be less than ==>2015"),

gender:zod.enum(['male','female']),
password:zod.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"the password must be >= 8 characters and contain : an uppercase letter +a lowercase + a number + a special chararcter from then list above "),

rePassword:zod.string()
  }).refine((obj)=>{
if (obj.password===obj.rePassword){
return true
}else{
  return false
}
  },{
    path:["rePassword"],
    error:"password and rePassword not match"
  });


  /////////////////////////////////////////


  
 export const loginSchema =
  zod.object({
 

  email:zod.email().nonempty("email is requried").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"),
 
 password:zod.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"the password must be >= 8 characters and contain : an uppercase letter +a lowercase + a number + a special chararcter from then list above "),

   })

  export type loginSchemaType=zod.infer<typeof loginSchema>
 