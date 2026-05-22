
import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { TextArea } from "../components/ui/TextArea";
import { Select } from "../components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";



type FormData = {
    email: string;
    nama: string;
    password: string;
    password_confirm: string;
    bio: string;
    event: string;
}

const schema = z.object({
    nama: z.string().min(1, "nama ne kown durung di isi"),
    email: z.string().min(1, "Email e be durung"),
    password: z.string().min(8, "Password e aja klalen"),
    password_confirm: z.string().min(8, "Password woi!"),
    bio: z.string().min(1, "Bio ne wajib"),
    event: z.string().min(1, "Event di isi o bol"),
})

export default function RegisterForm(){
     const {
        register, 
        handleSubmit, 
        formState: {errors},
    } = useForm<FormData>({
       resolver : zodResolver(schema)

    });
 
    const onSubmit = (data: FormData) => {
        console.log(data);
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputText
                    label="Nama"
                    nama="nama"
                    register={register}
                    error={errors.nama?.message}
                />
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
                <InputPassword
                    label="konformasi Password"
                    nama="password_confirm"
                    register={register}
                    error={errors.password_confirm?.message} 
                />

                <TextArea 
                    label="Bio"
                    name="bio"
                    register={register}
                    error={errors.bio?.message}
                />

                <Select
                    label="Event"
                    name="event"
                    register={register}
                    error={errors.event?.message}
                    options={[
                        { label: "Lomba sniper kedips", value: "Lomba sniper kedips" },
                        { label: "Seminar Grading Corporation", value: "Seminar Grading Corporation" },
                        { label: "Lomba grading paling cepet", value: "Lomba grading paling cepet" },
                        { label: "Seminar dari Ambadis", value: "Seminar dari Ambadis" },
                    ]}
                />

                <div>
                    <Button type="submit" label="Daftarrrrrrrrrr"/>
                </div>
            </form>
        </div>
    );
};

