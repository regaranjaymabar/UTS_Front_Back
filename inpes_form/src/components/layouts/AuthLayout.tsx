import { Outlet } from "react-router-dom";

export default function AuthLayout (){
    return (
        <div className="grid grid-cols-2 items-center min-h-screen">
            {/*kiri*/}
            <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
                <img
                    src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
                    alt=""
                    className='w-96'
                />
                <h2 className="font-bold">SUPER DUPER EVENT JOSJIS</h2>
            </div>
            
             {/*kanan*/}
            <div className="p-6">
                <Outlet/>
            </div>
        </div>
    )
}