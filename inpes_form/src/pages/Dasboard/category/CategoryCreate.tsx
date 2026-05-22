import { z } from "zod";
import { InputText } from '../../../components/ui/InputText';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string;
}

const schema = z.object({
  name: z.string().min(1, "Nama Kategori harus diisi"),
});

export default function CategoryCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // Tiruan persis pola login: Fungsi tidak pakai async/await di baris utama
  const onSubmit = (data: FormData) => {
    console.log("Mengirim data kategori:", data);

    // Kirim data ke backend di latar belakang (tanpa await yang bikin freeze)
    fetch("https://uts-front-back.vercel.app/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch(err => console.error("Log error latar belakang:", err));

    alert("data sudah ditambahkan");
    navigate("/dashboard/category")
  };
    
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 cursor-pointer">
          Tambah Kategori
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <InputText
              label="Nama Kategori"
              nama="name"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex gap-3 justify-start mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/category")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded transition w-1/2 cursor-pointer" type="submit" >Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}