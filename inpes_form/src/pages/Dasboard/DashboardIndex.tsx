import * as Icons from 'lucide-react';
export default function DashboardIndex() {
  const profile = {
    nama: "Rhegard Putra Davinto",
    nim: "24090099",
    kelas: "Teknik Informatika - 4C",
    email: "rhegaraa5x@gmail.com",
    noHp: "0857-4759-8070",
    deskripsi: "Mahasiswa yg suka... apa hayo tebak.",
    fotoUrl: "https://instagram.fsrg6-1.fna.fbcdn.net/v/t51.82787-15/598318020_18089177849313999_2931809488092396168_n.webp?_nc_cat=102&ig_cache_key=Mzc4NTI2NDg4NDgxMzU5NTA2NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=7aTyCoXOYOoQ7kNvwF0jk3h&_nc_oc=Adpl4wmr4jgPoCwMBHEbGAUN9v6L1o2oqkW0wnetZ8iTrz9boWuohEiAEv_HAk92qhcfHXfQp2Igj4k6Ws5bIjLk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsrg6-1.fna&_nc_gid=56reXmXpO3UnWvLUnl6zZw&_nc_ss=7a22e&oh=00_Af6vmMdl-H1ler_o-WwlHS2mIoUbOgV5Yanf_Db6hh72ow&oe=6A13A9A5"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <div className="w-full  bg-white rounded-3xl shadow-xl overflow-hidden">
        
        <div className="h-32 bg-linear-to-r from-pink-500 to-rose-600"></div>
        
        {/* Profile Section */}
        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-4">
            <img 
              src={profile.fotoUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800">{profile.nama}</h1>
          <p className="text-pink-600 font-medium mb-4">{profile.kelas}</p>
          
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {profile.deskripsi}
          </p>

          {/* Details Grid */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Icons.User size={18} className="text-pink-500 mr-3" />
              <span className="font-semibold w-24 text-sm">NIM</span>
              <span className="text-sm">{profile.nim}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Icons.BookOpen size={18} className="text-pink-500 mr-3" />
              <span className="font-semibold w-24 text-sm">Kelas</span>
              <span className="text-sm">{profile.kelas}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Icons.Mail size={18} className="text-pink-500 mr-3" />
              <span className="font-semibold w-24 text-sm">Email</span>
              <span className="text-sm">{profile.email}</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Icons.Phone size={18} className="text-pink-500 mr-3" />
              <span className="font-semibold w-24 text-sm">WhatsApp</span>
              <span className="text-sm">{profile.noHp}</span>
            </div>
          </div>

          {/* Social Links (Opsional) */}
          <div className="mt-8 flex justify-center space-x-4">
            <a 
            href="https://instagram.com/holygarr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 transition"
            >
            <img 
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" 
                alt="Instagram" 
                className="w-5 h-5" 
            />
            </a>

            <a 
            href="https://github.com/regaranjaymabar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 transition"
            >
            <img 
                src="https://cdn-icons-png.flaticon.com/512/733/733553.png" 
                alt="github" 
                className="w-5 h-5" 
            />
            </a>
           
          </div>
        </div>
      </div>
    </div>
  );
}