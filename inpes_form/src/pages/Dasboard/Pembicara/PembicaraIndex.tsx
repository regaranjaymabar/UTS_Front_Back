import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Buat interface data Pembicara agar TypeScript tidak komplain 'any'
interface PembicaraType {
  id: number;
  name: string;
  role?: string | null;
  image?: string | null;
}

export default function PembicaraIndex() {
  const navigate = useNavigate();
  
  // 2. Gunakan interface yang sudah kita buat tadi di dalam useState
  const [pembicaraList, setPembicaraList] = useState<PembicaraType[]>([]);

  // 3. Ambil data dengan penulisan yang disukai Linter ketat
  useEffect(() => {
    let isMounted = true; // Untuk mencegah memory leak / sync state error

    const fetchPembicara = async () => {
      try {
        const res = await fetch("https://uts-front-back.vercel.app/pembicara");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        
        if (isMounted) {
          setPembicaraList(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data pembicara:", error);
      }
    };

    fetchPembicara();

    return () => {
      isMounted = false;
    };
  }, []);

  // 4. Fungsi Hapus Data DB (Tetap amankan parameter id sebagai number)
  const handleDelete = async (id: number | string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pembicara ini?")) {
      try {
        // Paksa konversi ke number murni menggunakan Number()
        const cleanId = Number(id);

        const res = await fetch(`https://uts-front-back.vercel.app/pembicara/${cleanId}`, {
          method: "DELETE",
        });

        const result = await res.json();

        if (res.ok && result.success) {
          // Update state front-end agar baris langsung hilang
          setPembicaraList((prev) => prev.filter((p) => Number(p.id) !== cleanId));
          alert("Pembicara berhasil dihapus!");
        } else {
          // Tampilkan pesan error asli dari backend jika gagal
          alert(`Gagal menghapus: ${result.message || "Server Error"}`);
        }
      } catch (error) {
        console.error("Error saat menghapus data:", error);
        alert("Terjadi kesalahan koneksi ke server.");
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daftar Pembicara</h2>
          <p className="text-sm text-gray-500">Kelola semua pembicara event Invofest di sini</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/pembicara/create")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition shadow-md flex items-center gap-1 cursor-pointer text-sm"
        >
          + Tambah Pembicara
        </button>
      </div>

      {/* Grid Container untuk Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pembicaraList.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400">Belum ada data pembicara.</p>
          </div>
        ) : (
          pembicaraList.map((p) => (
            <div 
              key={p.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
            >
              {/* Bagian Foto (Besar di atas mengikuti referensi desain) */}
              <div className="w-full h-60 bg-gray-100 relative group">
                <img
                  src={p.image || ""}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback jika URL gambar eror / broken link
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
                  }}
                />
              </div>

             <div className="p-5 flex flex-col justify-between grow">
              <div className="flex justify-between items-center gap-2 mb-4">
                <h3 className="text-base font-bold text-gray-900 truncate" title={p.name}>
                  {p.name}
                </h3>
                <p className="text-xs font-semibold text-green-600 bg-indigo-50 px-2.5 py-1 rounded-md shrink-0">
                  {p.role || "Pembicara"}
                </p>
              </div>

                {/* Bagian Tombol Aksi di Bawah */}
                <div className="w-full flex gap-3 mt-auto">
                  <button
                    onClick={() => navigate(`/dashboard/pembicara/editpembicara/${p.id}`)}
                    className="flex-1 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)} 
                    className="flex-1 bg-pink-50  text-pink-700 hover:border-red-100 hover:bg-red-50 hover:text-red-600 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
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