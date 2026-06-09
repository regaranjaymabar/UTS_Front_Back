import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // 1. Siapkan state untuk 4 field User (name, email, password, foto)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Kosongkan secara default saat edit
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. Ambil data lama dari backend untuk mengisi form awal
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await fetch(`https://uts-front-back.vercel.app/user/${id}`);
        const result = await res.json(); 
        
        if (res.ok) {
          const dataLama = result.data ? result.data : result;

          setName(dataLama.name || ""); 
          setEmail(dataLama.email || ""); 
          setFoto(dataLama.foto || ""); // Pada model User, field database-nya langsung bernama 'foto'
        } else {
          alert("Data user tidak ditemukan");
          navigate("/dashboard/user");
        }
      } catch (error) {
        console.error("Gagal mengambil detail user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [id, navigate]);

  // 3. Fungsi mengirimkan perubahan data ke backend (PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://uts-front-back.vercel.app/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // Mengirim data ke userController (password bersifat opsional di backend)
        body: JSON.stringify({ name, email, password, foto }),
      });

      if (res.ok) {
        alert("User berhasil diupdate!");
        navigate("/dashboard/user");
      } else {
        const err = await res.json();
        alert(err.message || "Gagal update data user");
      }
    } catch (error) {
      console.error("Error saat update user:", error);
      alert("Terjadi kesalahan pada server");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Memuat data user...</p>;

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Akun User</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-lg space-y-5">
        
        {/* INPUT NAMA */}
        <div>
          <label className="block font-medium text-gray-700 mb-1 text-sm">Nama Lengkap</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        {/* INPUT EMAIL */}
        <div>
          <label className="block font-medium text-gray-700 mb-1 text-sm">Alamat Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            placeholder="contoh@domain.com"
          />
        </div>

        {/* INPUT PASSWORD */}
        <div>
          <label className="block font-medium text-gray-700 mb-1 text-sm">Password Baru (Opsional)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            placeholder="Kosongkan jika tidak ingin mengubah password"
          />
          <p className="text-xs text-gray-400 mt-1">Biarkan kosong jika password akun tetap sama.</p>
        </div>

        {/* INPUT URL FOTO */}
        <div>
          <label className="block font-medium text-gray-700 mb-1 text-sm">URL Foto Profil (Opsional)</label>
          <input
            type="text"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            placeholder="Masukkan tautan/URL foto"
          />
          
          {/* Preview Foto */}
          {foto && (
             <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
               <img 
                 src={foto} 
                 alt="Preview Profil" 
                 className="w-12 h-12 rounded-full object-cover border border-gray-200"
                 onError={(e) => (e.currentTarget.src = "")}
               />
               <span className="text-xs text-gray-500">Preview foto profil user</span>
             </div>
          )}
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/dashboard/user")}
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