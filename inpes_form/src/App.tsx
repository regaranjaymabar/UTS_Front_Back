import HomePagePraktek from "./pages/HomaPagePraktek";
import Competition from "./pages/Competition";
import Seminar from "./pages/Seminar";
import Workshop from "./pages/Workshop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Talkshow from "./pages/Talkshow";
import AuthLayout from "./components/layouts/AuthLayout";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterEvent";
import Dashboardindex from "./pages/Dasboard/DashboardIndex";
import ProtectedRoute from "./routes/ProtectedRoute,";
import DashboardLayout from "./components/layouts/DashboardLayout";
import CategoryIndex from "./pages/Dasboard/category/CategoryIndex";
import PembicaraIndex from "./pages/Dasboard/Pembicara/PembicaraIndex";
import EventIndex from "./pages/Dasboard/Event/EventIndex";
import CategoryCreate from "./pages/Dasboard/category/CategoryCreate";
import PembicaraCreate from "./pages/Dasboard/Pembicara/PembicaraCreate";
import EventCreate from "./pages/Dasboard/Event/EventCreate";
import CategoryEdit from "./pages/Dasboard/category/CategoryEdit";
import EventEdit from "./pages/Dasboard/Event/EventEdit";
import PembicaraEdit from "./pages/Dasboard/Pembicara/PembicaraEdit";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
         <Route path="/"element={<HomePagePraktek/>}/>
         <Route path="/competition" element={<Competition/>}/>
         <Route path="/seminar" element={<Seminar/>}/>
         <Route path="/workshop" element={<Workshop/>}/>
         <Route path="/talkshow" element={<Talkshow/>}/>
  
        </Route>

        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
        </Route>

        <Route element={<ProtectedRoute/>} >
          <Route element={<DashboardLayout/>}>
            <Route path="/dashboard"element={<Dashboardindex/>}/>

            <Route path="/dashboard/category"element={<CategoryIndex/>}/>
            <Route path="/dashboard/category/create"element={<CategoryCreate/>}/>
            <Route path="/dashboard/category/editcategory/:id/"element={<CategoryEdit/>}/>

            <Route path="/dashboard/pembicara/"element={<PembicaraIndex/>}/>
            <Route path="/dashboard/pembicara/create"element={<PembicaraCreate/>}/>
            <Route path="/dashboard/pembicara/editpembicara/:id/"element={<PembicaraEdit/>}/>


            <Route path="/dashboard/event"element={<EventIndex/>}/>
            <Route path="/dashboard/event/create"element={<EventCreate/>}/>
            <Route path="/dashboard/event/editevent/:id/"element={<EventEdit/>}/>
            
          </Route>
        </Route> 
      </Routes>
    </BrowserRouter>
  );


}

export default App;
