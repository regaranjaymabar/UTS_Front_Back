import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { InputText } from '../../../components/ui/InputText';
import Button from '../../../components/ui/Button';

// 1. Sesuaikan Zod Schema agar data lengkap untuk database
const schema = z.object({
  nama: z.string().min(1, "Nama Event harus diisi"),
  categoryId: z.string().min(1, "Kategori harus dipilih"),
  pembicaraId: z.string().min(1, "Pembicara harus dipilih"), 
  tanggal: z.string().min(1, "Tanggal harus diisi"),
  jam: z.string().min(1, "Jam harus diisi"),
  location: z.string().min(1, "Lokasi harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi")
});

type FormData = z.infer<typeof schema>;
type Option = { id: number; name: string };

export default function EventCreate() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Option[]>([]);
  const [speakers, setSpeakers] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // 2. Fetch data Kategori dan Pembicara saat halaman dimuat
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const resCat = await fetch("https://uts-front-back.vercel.app/category");
        const dataCat = await resCat.json();
        // Cek struktur responser
        setCategories(dataCat.data ? dataCat.data : dataCat);

        const resSpk = await fetch("https://uts-front-back.vercel.app/pembicara");
        const dataSpk = await resSpk.json();
        setSpeakers(dataSpk.data ? dataSpk.data : dataSpk);
      } catch (error) {
        console.error("Gagal mengambil data dropdown:", error);
      }
    };
    fetchOptions();
  }, []);

  // 3. Fungsi Submit Data ke Backend
  const onSubmit = async (data: FormData) => {
  setLoading(true);
  try {
    // Gabungkan tanggal dan jam menjadi string ISO standar
    const isoDateTime = new Date(`${data.tanggal}T${data.jam}:00`).toISOString();

   const payload = {
      name: data.nama,
      categoryId: parseInt(data.categoryId, 10),
      pembicaraId: parseInt(data.pembicaraId, 10), 
      location: data.location,
      date: isoDateTime, 
      description: data.description,
    };

    const res = await fetch("https://uts-front-back.vercel.app/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Event berhasil ditambahkan!");
      navigate("/dashboard/event");
    } else {
      // Jika backend melempar status 400 atau 500, baca pesan aslinya di sini
      alert(`Gagal dari server: ${result.message}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Terjadi kesalahan");
  } finally {
    setLoading(false);
  }
};

  return (
    // 1. Hapus max-w-2xl dan mx-auto, ganti dengan w-full
    <div className="p-6 w-full">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Tambah Event
        </h2>

        {/* 2. Ubah flex-col menjadi grid 2 kolom */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Nama Event (Dibuat full lebar / span-2) */}
          <div className="lg:col-span-2">
            <InputText
              label="Nama Event"
              nama="nama"
              register={register}
              error={errors.nama?.message}
            />
          </div>

          {/* Dropdown Kategori */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Kategori</label>
            <select
              {...register("categoryId")}
              className={`border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white ${
                errors.categoryId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>

          {/* Dropdown Pembicara */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Pembicara</label>
            <select
              {...register("pembicaraId")}
              className={`border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white ${
                errors.pembicaraId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Pembicara --</option>
              {speakers.map((spk) => (
                <option key={spk.id} value={spk.id}>
                  {spk.name}
                </option>
              ))}
            </select>
            {errors.pembicaraId && <p className="text-red-500 text-sm mt-1">{errors.pembicaraId.message}</p>}
          </div>

          {/* Tanggal & Jam (Bersebelahan di dalam 1 kolom) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Tanggal</label>
              <input
                type="date"
                {...register("tanggal")}
                className={`border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.tanggal ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.tanggal && <p className="text-red-500 text-sm mt-1">{errors.tanggal.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Jam</label>
              <input
                type="time"
                {...register("jam")}
                className={`border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.jam ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.jam && <p className="text-red-500 text-sm mt-1">{errors.jam.message}</p>}
            </div>
          </div>

          {/* Lokasi (Membungkus InputText dalam div agar proporsional) */}
          <div className="flex flex-col justify-end">
            <InputText
              label="Lokasi"
              nama="location"
              register={register}
              error={errors.location?.message}
            />
          </div>

          {/* Deskripsi (Dibuat full lebar / span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Deskripsi</label>
            <textarea
              {...register("description")}
              rows={4}
              className={`border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Tombol Simpan */}
          <div className="lg:col-span-2 flex justify-end mt-4">
             <Button type="submit" label={loading ? "Menyimpan..." : "Simpan"} />
          </div>
        </form>
      </div>
    </div>
  );
};