import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt"; // Tambahan wajib untuk keamanan password

// 1. Menampilkan Semua User
export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      // HANYA SELECT FIELD YANG AMAN, JANGAN KIRIM PASSWORD KE FRONTEND
      select: {
        id: true,
        name: true,
        email: true,
        foto: true,
        createdAt: true,
      }
    });
    res.status(200).json(allUsers); 
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data user",
      error,
    });
  }
};

// 2. Menyimpan data User Baru
export const saveUser = async (req: Request, res: Response) => {
  const { name, email, password, foto } = req.body;

  // Validasi input wajib
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nama, email, dan password harus diisi!" });
  }

  try {
    // Proses Hashing Password (Keamanan)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        foto: foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        createdAt: new Date(),
      } as any,
    });

    // Buang password dari objek response sebelum dikirim ke frontend
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({ 
      message: "Data user berhasil disimpan", 
      data: userWithoutPassword 
    });
  } catch (error) {
    console.error("Prisma Error:", error);
    return res.status(500).json({ 
      message: "Gagal menyimpan data ke database", 
      error 
    });
  }
};

// 3. Menampilkan data User berdasarkan ID
export const showUserById = async (req: Request<{ id: string }>, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        foto: true,
        createdAt: true,
      } // Amankan password
    });

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// 4. Mengupdate User berdasarkan ID
export const updateUserById = async (req: Request<{ id: string }>, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email, password, foto } = req.body;

  try {
    // Siapkan objek data yang akan diupdate
    const updateData: any = { 
      name, 
      email, 
      foto 
    };

    // Jika admin menginput password baru, lakukan hashing ulang
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(200).json({ 
      success: true, 
      message: 'User berhasil diupdate', 
      data: userWithoutPassword 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal update data, pastikan ID benar', 
      error 
    });
  }
};

// 5. Menghapus User berdasarkan ID
export const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: "ID tidak valid" });
  }

  try {
    // Catatan: Jika User ini memiliki relasi ke tabel lain (misal tabel Log/Event), 
    // kamu bisa tambahkan logika pengecekan di sini seperti pada pembicaraController.
    // Jika tidak ada relasi, bisa langsung dihapus seperti di bawah ini.

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({ 
      success: true, 
      message: "User berhasil dihapus" 
    });
  } catch (error) {
    console.error("Prisma Delete Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Terjadi kesalahan pada server saat menghapus data", 
      error 
    });
  }
};