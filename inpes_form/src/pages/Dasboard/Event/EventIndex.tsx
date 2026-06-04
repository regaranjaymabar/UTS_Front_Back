import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  description?: string; 
  pembicara?: { name: string, image: string }; 
  
}

export default function EventIndex() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://uts-front-back.vercel.app/event");
        if (res.ok) {
          const data = await res.json();
          
          if (Array.isArray(data)) {
            setEvents(data);
          } else if (data.data && Array.isArray(data.data)) {
            setEvents(data.data);
          } else {
            console.error("Format data dari backend tidak dikenalii", data);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data event:", error);
      }
    }
    fetchEvents();
  }, []);

  function handleDelete(id: number) {
    if (confirm("Apakah kamu yakin ingin menghapus event ini?")) {
      fetch(`https://uts-front-back.vercel.app/event/${id}`, { method: "DELETE" })
        .then(async (res) => {
          if (res.ok) {
            setEvents((prev) => prev.filter((evt) => evt.id !== id));
            alert("Data event berhasil dihapus!");
          } else {
            const err = await res.json();
            alert(`Gagal menghapus: ${err.message}`);
          }
        })
        .catch((err) => console.error("Error delete:", err));
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="h-full flex flex-col w-full p-6 text-left overflow-hidden">
      
      {/* Header Tetap */}
      <div className="flex-none flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Event</h1>
          <p className="text-sm text-gray-500">Kelola semua jadwal event Infovest di sini</p>
        </div>
        <Link 
          to="/dashboard/event/create" 
          className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-2.5 px-5 font-semibold text-sm transition-all"
        >
          + Tambah Event
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6">
        {events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Belum ada data event</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((evt) => (
              <div 
                key={evt.id} 
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col lg:flex-row lg:items-center gap-6 hover:shadow-md transition duration-300 w-full"
              >
                {/* 1. Kiri: Info Event (Nama & Deskripsi) */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1" title={evt.name}>
                    {evt.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {evt.description || <span className="text-gray-400 italic">Tidak ada deskripsi</span>}
                  </p>
                </div>

                {/* 2. Tengah: Pembicara */}
                <div className="flex items-center gap-3 w-full lg:w-48 shrink-0">
                  <img
                      src={evt.pembicara?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                      alt={evt.pembicara?.name || "Pembicara"}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm shrink-0"
                      onError={(e) => {
                        // Fallback jika url gambar pembicara kosong atau error
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
                      }}
                    />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pembicara</span>
                    <span className="text-sm font-semibold text-gray-700 truncate" title={evt.pembicara?.name}>
                      {evt.pembicara?.name || "Belum ditentukan"}
                    </span>
                  </div>
                </div>

                {/* 3. Tengah: Waktu & Lokasi */}
                <div className="flex flex-col gap-1 w-full lg:w-56 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                  <div className="flex items-center text-xs text-gray-600 gap-2">
                    <span className="font-bold text-gray-400 uppercase w-14">Waktu</span>
                    <span className="text-gray-700">{formatDate(evt.dateEvent)}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 gap-2">
                    <span className="font-bold text-gray-400 uppercase w-14">Lokasi</span>
                    <span className="text-gray-700 truncate" title={evt.location}>{evt.location}</span>
                  </div>
                </div>

                {/* 4. Kanan: Tombol Aksi */}
                <div className="flex gap-2 w-full lg:w-auto shrink-0 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
                  <Link 
                    to={`/dashboard/event/editevent/${evt.id}`} 
                    className="flex-1 lg:flex-none text-center bg-amber-50 text-amber-700 hover:bg-amber-100 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(evt.id)} 
                    className="flex-1 lg:flex-none bg-red-50 text-red-700 hover:bg-red-100 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}