import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Buat interface data User sesuai dengan kolom tabel database MySQL kamu
interface UserType {
  id: number;
  name: string;
  email: string;
  foto?: string | null;
}

export default function UserIndex() {
  const navigate = useNavigate();
  
  // 2. Gunakan interface UserType di dalam state
  const [userList, setUserList] = useState<UserType[]>([]);

  // 3. Ambil data dari endpoint /user
  useEffect(() => {
    let isMounted = true; 

    const fetchUsers = async () => {
      try {
        const res = await fetch("https://uts-front-back.vercel.app/user");
        if (!res.ok) throw new Error("Gagal mengambil data user");
        const data = await res.json();
        
        if (isMounted) {
          setUserList(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  // 4. Fungsi Hapus Data User Berdasarkan ID
  const handleDelete = async (id: number | string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        const cleanId = Number(id);

        const res = await fetch(`https://uts-front-back.vercel.app/user/${cleanId}`, {
          method: "DELETE",
        });

        const result = await res.json();

        if (res.ok && result.success) {
          // Update state agar baris kartu langsung hilang secara realtime
          setUserList((prev) => prev.filter((u) => Number(u.id) !== cleanId));
          alert("User berhasil dihapus!");
        } else {
          alert(`Gagal menghapus: ${result.message || "Server Error"}`);
        }
      } catch (error) {
        console.error("Error saat menghapus data user:", error);
        alert("Terjadi kesalahan koneksi ke server.");
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daftar User</h2>
          <p className="text-sm text-gray-500">Kelola semua hak akses dan akun user di sini</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/user/create")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition shadow-md flex items-center gap-1 cursor-pointer text-sm"
        >
          + Tambah User
        </button>
      </div>

      {/* Grid Container untuk Cards User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userList.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400">Belum ada data akun user.</p>
          </div>
        ) : (
          userList.map((u) => (
            <div 
              key={u.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
            >
              {/* Bagian Foto Profil User */}
              <div className="w-full h-60 bg-gray-100 relative group">
                <img
                  src={u.foto || ""}
                  alt={u.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback jika URL gambar eror atau string kosong
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
                  }}
                />
              </div>

              {/* Detail Konten Informasi */}
              <div className="p-5 flex flex-col justify-between grow">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-gray-900 truncate" title={u.name}>
                    {u.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-1" title={u.email}>
                    {u.email}
                  </p>
                </div>

                {/* Bagian Tombol Aksi Edit / Hapus */}
                <div className="w-full flex gap-3 mt-auto">
                  <button
                    onClick={() => navigate(`/dashboard/user/edituser/${u.id}`)}
                    className="flex-1 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)} 
                    className="flex-1 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}