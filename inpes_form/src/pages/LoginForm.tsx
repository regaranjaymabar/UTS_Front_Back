import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { Link} from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useAuthStore } from "../components/Store/useAuthStore";



type FormData = {
    email: string;
    password: string;
}

const schema = z.object({
    email: z.string().min(1, "Email aja klalen di isi"),
    password: z.string().min(8, "Password harus "),
})

export default function LoginForm(){
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login)
    const { 
        register, 
        handleSubmit, 
        formState: { errors }
     } = useForm<FormData>({
        resolver: zodResolver(schema)
     });
 
    
    
    const onSubmit = (data: FormData) => {
        console.log(data);
        if(data.email == "24090099" && data.password == "ambalala"){
            alert("login berhasil");
            login(data.email);
        
            navigate("/dashboard");
        }   else {
                alert("email arau kata sandi salah")
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="Email"
                    nama="email"
                    register={register}
                    error={errors.email?.message}
                />

                <InputPassword
                    label="Password"
                    nama="password"
                    register={register}
                    error={errors.password?.message} 
                />

                <div>
                    <Button type="submit" label="Login klik disini bos"/>
                </div>
                <div>
                    belum punya akun? <Link to="/register">Daftar disini</Link>
                </div>
            </form>
        </div>
    );
};

