import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan Semua Pembicara
export const getPembicara = async (req: Request, res: Response) => {
  try {
    const allSpeakers = await prisma.pembicara.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(allSpeakers); 
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data pembicara",
      error,
    });
  }
};

// 2. Menyimpan data Pembicara Baru
export const savePembicara = async (req: Request, res: Response) => {
  const { name, role, foto } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nama pembicara harus diisi!" });
  }

  try {
    const newPembicara = await prisma.pembicara.create({
      data: {
        name: name,
        role: role || "",
        image: foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        createdAt: new Date(),
      } as any,
    });

    return res.status(201).json({ 
      message: "Data berhasil disimpan", 
      data: newPembicara 
    });
  } catch (error) {
    console.error("Prisma Error:", error);
    return res.status(500).json({ 
      message: "Gagal menyimpan data ke database", 
      error 
    });
  }
};

// 3. Menampilkan data pembicara berdasarkan ID
export const showPembicaraById = async (req: Request<{ id: string }>, res: Response) => {
  const pembicaraId = parseInt(req.params.id, 10);

  try {
    const pembicaraData = await prisma.pembicara.findUnique({
      where: { id: pembicaraId }
    });

    if (!pembicaraData) {
      return res.status(404).json({ success: false, message: 'Pembicara tidak ditemukan' });
    }

    res.status(200).json(pembicaraData);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// 4. Mengupdate pembicara berdasarkan ID
export const updatePembicaraById = async (req: Request<{ id: string }>, res: Response) => {
  const pembicaraId = parseInt(req.params.id, 10);
  const { name, role, foto } = req.body;

  try {
    const updatedPembicara = await prisma.pembicara.update({
      where: { id: pembicaraId },
      data: {
        name,
        role,
        image: foto
      } as any
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Pembicara berhasil diupdate', 
      data: updatedPembicara 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal update data, pastikan ID benar', 
      error 
    });
  }
};

// 5. Menghapus pembicara berdasarkan ID (Aman dari bentrok Relasi Event)
// 5. Menghapus pembicara berdasarkan ID (Proteksi Relasi Event)
export const deletePembicaraById = async (req: Request<{ id: string }>, res: Response) => {
  const pembicaraId = parseInt(req.params.id, 10);

  if (isNaN(pembicaraId)) {
    return res.status(400).json({ success: false, message: "ID tidak valid" });
  }

  try {
    // Langkah 1: Cek apakah ada Event yang dijadwalkan menggunakan pembicara ini
    const connectedEventsCount = await prisma.event.count({
      where: {
        pembicaraId: pembicaraId,
      },
    });

    // Langkah 2: Jika hitungan Event lebih dari 0, TOLAK PENGHAPUSAN
    if (connectedEventsCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Gagal menghapus! Pembicara ini masih terikat dengan jadwal Event.",
      });
    }

    // Langkah 3: Jika bersih (0 event), baru izinkan hapus dari database
    await prisma.pembicara.delete({
      where: { id: pembicaraId },
    });

    return res.status(200).json({ 
      success: true, 
      message: "Pembicara berhasil dihapus" 
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