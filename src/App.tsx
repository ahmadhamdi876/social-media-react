 
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import Notfound from './pages/Notfound/Notfound';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectRoute/ProtectRoute';
import ProtectRegister from './components/ProtectRoute/protectRegister';
 
import {QueryClientProvider ,QueryClient}from "@tanstack/react-query"
 
import PostDetails from './pages/postDetails/PostDetails';
import  { Toaster } from 'react-hot-toast';
 import {useNetworkState} from "react-use"
import Offline from './components/offline/Offline';

const query =new QueryClient()
 
const router=createBrowserRouter([
  {path:"" , element:<Layout/>, children:[
  {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
  {path:"home" , element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:"profile" , element:<ProtectedRoute><Profile/></ProtectedRoute>},
  {path:"login" , element:<ProtectRegister><Login/> </ProtectRegister>},
  {path:"postdetails/:id" , element:<ProtectedRoute><PostDetails/> </ProtectedRoute>},
  {path:"register" , element:<ProtectRegister><Register/> </ProtectRegister> },
  {path:"*" , element:<Notfound/>}
  ]}
 
])
function App() {



    const networkState = useNetworkState();
  return (
  <>

 {!networkState.online &&<Offline/> }
 
 <QueryClientProvider client={query}>

 <AuthContextProvider>

<Toaster/>
  <RouterProvider router={router}></RouterProvider>

 </AuthContextProvider>

 </QueryClientProvider>
 


 
 
 
   
   
  </>
  )
}

export default App
