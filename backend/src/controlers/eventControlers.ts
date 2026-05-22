import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan Semua Event
export const getEvents = async (req: Request, res: Response) => {
    try {
        const allEvents = await prisma.event.findMany({
            orderBy: {
                createdAt: "desc"
            },
             include: {pembicara: true } 
        });
        res.json(allEvents); 
    } catch (error) {
        res.status(500).json({ message: "Gagal ambil data event", error });
    }
};

// 2. Save Event (Simpan ke DB)
export const saveEvents = async (req: Request, res: Response) => {
    try {
        // PENTING: Pastikan pembicaraId juga ditangkap dari frontend
        const { name, categoryId, pembicaraId, location, date, description } = req.body;
        
        console.log("Data dari frontend:", req.body);
        if (!name || !categoryId || !pembicaraId || !location || !date) {
            return res.status(400).json({ message: "Data tidak lengkap bos!" });
        }

        const newEvent = await prisma.event.create({
            data: {
                name: name,
                categoryId: parseInt(categoryId, 10), 
                pembicaraId: parseInt(pembicaraId, 10), // Tambahan pembicara
                location: location,
                dateEvent: new Date(date),          // Gunakan dateEvent
                description: description || "",
                createdAt: new Date()                
            }
        });

        return res.status(201).json({ success: true, message: "Data berhasil disimpan", event: newEvent });
    } catch (error) {
        console.error("Error Detail Prisma Save:", error); 
        return res.status(500).json({ message: "Gagal menyimpan ke database", error });
    }
    
};

// 3. Show Event by ID (Ambil dari DB)
export const showEventById = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id as string, 10);
        const event = await prisma.event.findUnique({ where: { id: eventId } });

        if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ message: "Error server", error });
    }
};

// 4. Update Event (Update ke DB)
export const updateEventById = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id as string, 10);
        // Tangkap juga jika ada perubahan kategori atau pembicara
        const { name, description, date, location, categoryId, pembicaraId } = req.body;

        const updatedEvent = await prisma.event.update({
            where: { id: eventId },
            data: { 
                name, 
                description, 
                location,
                // Pastikan menggunakan field yang benar sesuai schema
                ...(date && { dateEvent: new Date(date) }),
                ...(categoryId && { categoryId: parseInt(categoryId, 10) }),
                ...(pembicaraId && { pembicaraId: parseInt(pembicaraId, 10) })
            }
        });

        res.status(200).json({ success: true, message: 'Event berhasil diperbarui', data: updatedEvent });
    } catch (error) {
        console.error("Error Detail Prisma Update:", error);
        res.status(500).json({ message: "Gagal mengupdate event", error });
    }
};

// 5. Delete Event (Hapus dari DB)
export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id as string, 10);
        
        await prisma.event.delete({
            where: { id: eventId }
        });

        res.status(200).json({ success: true, message: 'Event berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus event", error });
    }
};