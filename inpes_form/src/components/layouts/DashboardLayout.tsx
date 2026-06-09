import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

export default function DashboardLayout(){
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
    }

    return(
        // 1. Kunci tinggi layout utama seukuran layar h-screen dan sembunyikan scroll induk
        <div className="flex w-full h-screen overflow-hidden">
            
            {/* 2. Sidebar tetap w-64, tapi dikunci tingginya (h-full) */}
            <div className="bg-pink-300 w-64 flex flex-col justify-between p-4 h-full shrink-0">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" alt="Logo Invofest"/>
                </div>

                <div>
                    <ul className="flex flex-col gap-6 w-full">
                        <li>
                            <Link className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded"
                            to="/dashboard/category">Category</Link>
                        </li>
                        <li>
                            <Link className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded"
                            to="/dashboard/pembicara">Pembicara</Link>
                        </li>
                        <li>
                            <Link className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded"
                            to="/dashboard/event">Event</Link>
                        </li>
                        <li>
                            <Link className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded"
                            to="/dashboard/user">User</Link>
                        </li>
                        <li>
                            <Link className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded"
                            to="/dashboard">BioSaya</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <button type="button" onClick={handleLogout} className="w-full p-4 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700">Logout</button>
                </div>
            </div>

            {/* 3. Area Konten Utama diberikan h-full dan overflow-y-auto agar hanya area ini yang bisa di-scroll */}
            <div className="p-4 flex-1 h-full overflow-y-auto bg-gray-50">
                <Outlet/>
            </div>
        </div>
    )
}