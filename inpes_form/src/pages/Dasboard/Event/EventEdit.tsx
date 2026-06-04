import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from '../../../components/ui/InputText';
import Button from '../../../components/ui/Button';

// 1. Skema Validasi (Sama persis dengan Create)
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

export default function EventEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<Option[]>([]);
  const [speakers, setSpeakers] = useState<Option[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // 2. Fetch Data (Event Detail, Category, Pembicara)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Dropdown Data
        const resCat = await fetch("https://uts-front-back.vercel.app/category");
        const dataCat = await resCat.json();
        setCategories(dataCat.data ? dataCat.data : dataCat);

        const resSpk = await fetch("https://uts-front-back.vercel.app/pembicara");
        const dataSpk = await resSpk.json();
        setSpeakers(dataSpk.data ? dataSpk.data : dataSpk);

        // Fetch Event Detail berdasarkan ID
        const resEvent = await fetch(`https://uts-front-back.vercel.app/event/${id}`);
        const dataEvent = await resEvent.json();

        if (resEvent.ok) {
          const ev = dataEvent.data;
          

          const dateObj = new Date(ev.dateEvent || ev.date); 
          const tanggalFormat = dateObj.toISOString().split("T")[0]; // Hasil: YYYY-MM-DD
          const jamFormat = dateObj.toISOString().split("T")[1].substring(0, 5); // Hasil: HH:mm

          // Isi form otomatis dengan data yang ditarik
          reset({
            nama: ev.name,
            categoryId: ev.categoryId.toString(),
            pembicaraId: ev.pembicaraId.toString(),
            tanggal: tanggalFormat,
            jam: jamFormat,
            location: ev.location,
            description: ev.description,
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal memuat data event.");
      } finally {
        setPageLoading(false);
      }
    };
    fetchData();
  }, [id, reset]);

  // 3. Submit Update Data (Menggunakan PUT)
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const isoDateTime = new Date(`${data.tanggal}T${data.jam}:00`).toISOString();
      const payload = {
        name: data.nama,
        categoryId: parseInt(data.categoryId, 10),
        pembicaraId: parseInt(data.pembicaraId, 10),
        location: data.location,
        date: isoDateTime, 
        description: data.description,
      };

      const res = await fetch(`https://uts-front-back.vercel.app/event/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Event berhasil diperbarui!");
        navigate("/dashboard/event");
      } else {
        alert(`Gagal update: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat update data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pageLoading) {
    return <div className="p-6 text-gray-600 font-medium">Memuat data event...</div>;
  }

  return (
    <div className="p-6 w-full">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="lg:col-span-2">
            <InputText
              label="Nama Event"
              nama="nama"
              register={register}
              error={errors.nama?.message}
            />
          </div>

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
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>

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
                <option key={spk.id} value={spk.id}>{spk.name}</option>
              ))}
            </select>
            {errors.pembicaraId && <p className="text-red-500 text-sm mt-1">{errors.pembicaraId.message}</p>}
          </div>

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

          <div className="flex flex-col justify-end">
            <InputText
              label="Lokasi"
              nama="location"
              register={register}
              error={errors.location?.message}
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Deskripsi</label>
            <textarea
              {...register("description")}
              rows={4}
              className={`border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Tombol Simpan & Batal */}
          <div className="lg:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/event")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <Button type="submit" label={isSubmitting ? "Menyimpan..." : "Simpan Perubahan"} />
          </div>
        </form>
      </div>
    </div>
  );
}