import react, { useContext } from "react"
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home"
import { QueryClient, QueryClientProvider } from "react-query"
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import { RouterProvider, createBrowserRouter,Outlet } from "react-router-dom"
import Profile from "./components/profile/Profile";
import Orgregister from "./pages/register/Orgregister";
import Orglogin from "./pages/login/Orglogin";
import Event from "./components/Event-container/Event";
import { AuthContext } from "./context/Authcontext";
import Orgevent from "./components/Event-container/Orgevent";
import Orghome from "./pages/Home/Orghome";
import Loader from "./components/loader/Loader";
import Createevent from "./components/createevent/Createevent";
import Findevents from "./components/findevents/Findevets";
import Updates from "./components/updates/Updates";

function App() {
 const {usertype}=useContext(AuthContext)
  
  console.log("User-type -",usertype)
  const queryClient= new QueryClient()

  const Layout=()=>{
    return(
    
    <QueryClientProvider client={queryClient} >
      <div>
   
        <Navbar/>
        <div style={{display:"flex"}} >
         <Leftbar/>
        <div style={{flex:8.5}} >
          <Outlet/>
         </div>
        </div>
      </div>
    </QueryClientProvider>

    )
  }

  const router=createBrowserRouter(
 
   [
    {
      path:"/home",
      element:(
        <Layout/>
      ),
      children:[
        {
          path:"/home",
          element:(usertype==="applicant"?<Home/>:<Orghome/>)
        },
        {
          path:"/home/profile",
          element:<Profile/>
        },
        {
            path:"/home/events/:eventId",
            element:(usertype==="applicant"?<Event/>:<Orgevent/>)
        },
        {
            path:"/home/createevent",
            element:<Createevent/>
        },
        {
            path:"/home/findevents",
            element:<Findevents/>
        },
        {
          path:"/home/myupdates",
          element:<Updates/>
        }
       ]
      
    },
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/organiserregister",
      element:<Orgregister/>
    },
    {
      path:"/organiserlogin",
      element:<Orglogin/>
    }
  ]

  )


  return (
  <>
  <RouterProvider router={router} />
  </>
  );
}

export default App;
