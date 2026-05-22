import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function MainLayout (){
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header/>

            <main className="container max-w-7xl">
                <Outlet/>
            </main>

            <Footer/>
        </div>
    )
}