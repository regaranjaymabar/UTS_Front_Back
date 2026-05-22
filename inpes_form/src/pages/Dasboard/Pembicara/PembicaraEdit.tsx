import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PembicaraEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // 1. Siapkan state untuk 3 field Pembicara
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. Ambil data lama dari database untuk mengisi form (Update form)
  useEffect(() => {
    const fetchPembicaraDetail = async () => {
      try {
        const res = await fetch(`https://uts-front-back.vercel.app/pembicara/${id}`);
        const result = await res.json(); 
        
        if (res.ok) {
          // Sesuaikan dengan response JSON dari backend kamu.
          // Jika pakai controller yang kita buat sebelumnya, datanya langsung ada di 'result'
          const dataLama = result.data ? result.data : result;

          setName(dataLama.name || ""); 
          setRole(dataLama.role || ""); 
          // Di frontend kita pakai state 'foto', tapi dari database aslinya bernama 'image'
          setFoto(dataLama.image || ""); 
        } else {
          alert("Data pembicara tidak ditemukan");
          navigate("/dashboard/pembicara");
        }
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPembicaraDetail();
  }, [id, navigate]);

  // 3. Fungsi untuk mengirimkan perubahan data ke backend (Update via PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://uts-front-back.vercel.app/pembicara/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // Pastikan key-nya sesuai dengan yang ditangkap di pembicaraControler.ts (name, role, foto)
        body: JSON.stringify({ name, role, foto }),
      });

      if (res.ok) {
        alert("Pembicara berhasil diupdate!");
        navigate("/dashboard/pembicara");
      } else {
        const err = await res.json();
        alert(err.message || "Gagal update data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan pada server");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Memuat data pembicara...</p>;

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Pembicara</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-lg space-y-5">
        
        {/* INPUT NAMA */}
        <div>
          <label className="block font-medium text-gray-700 mb-1 text-sm">Nama Pembicara</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
            placeholder=""
          />
        </div>

        {/* INPUT ROLE */}
        <div>
          <label className="block font-medium text-gray-700 mb-1 text-sm">Peran / Profesi (Opsional)</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
            placeholder="Contoh: Web Developer"
          />
        </div>

        {/* INPUT FOTO */}
        <div>
          <label className="block font-medium text-gray-700 mb-1 text-sm">URL Foto (Opsional)</label>
          <input
            type="text"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
            placeholder="Foto Pembicrara"
          />
          {/* Tampilkan preview foto kecil jika linknya ada */}
          {foto && (
             <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
               <img 
                 src={foto} 
                 alt="Preview" 
                 className="w-12 h-12 rounded-full object-cover border border-gray-200"
                 onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150")}
               />
               <span className="text-xs text-gray-500">Preview foto saat ini</span>
             </div>
          )}
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/dashboard/pembicara")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl transition w-1/2 cursor-pointer text-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 px-4 rounded-xl transition w-1/2 cursor-pointer shadow-md text-sm"
          >
            Simpan Perubahan
          </button>
        </div>

      </form>
    </div>
  );
}