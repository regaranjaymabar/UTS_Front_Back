import { Request, Response  } from "express";
import { Category  } from "../types/category.js";
import { prisma } from "../lib/db.js";

let category: Category  [] = [];

//1. menampilkan Event
export const getCategory = async (req: Request, res: Response) => {
    try {
        const allEvents = await prisma.category.findMany({
            orderBy: {
                createdAt:"desc"
            },
        });
        res.json(allEvents); 
    } catch (error) {
        res.status(500).json({
            message:"gagal ambil data event",
            error,
        });
    }
};

// menyimpan data event
export const saveCategory = async (req: Request, res: Response) => {
    const {name, createdAd} = req.body;
    
        // validasi sederhana
        if(!name) {
            res.status(500).json({message: "yaa erorr"})
        }
        //validasi berhsail
        const newCategory = await prisma.category.create({
            data:{
                name,
            },
        });
}

// menampilkan data category berdasrkan id
// 3. menampilkan data category berdasrkan id (Sudah diperbaiki ke Prisma)
export const showCategoryById = async (req: Request<{id: string}>, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        
        const categoryData = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!categoryData) {
            res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
            return;
        }

        res.status(200).json({ success: true, data: categoryData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// 4. mengupdate category berdasrkan id (Sudah diperbaiki ke Prisma)
export const updateCategoryById = async (req: Request<{id: string}>, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: 'Nama harus diisi bos' });
            return;
        }

        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: { name }
        });

        res.status(200).json({ success: true, message: 'Category berhasil diupdate', data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal update atau data tidak ditemukan", error });
    }
};

export const deleteCategoryById = async (req: Request<{id: string}>, res: Response) => {
    try {
        // Konversi ID string dari URL parameter menjadi Int/Number untuk database
        const categoryId = parseInt(req.params.id, 10);

        // Eksekusi hapus langsung ke database lewat Prisma
        await prisma.category.delete({
            where: {
                id: categoryId
            }
        });

        // Kirim response sukses penutup ke React Frontend
        res.status(200).json({ success: true, message: 'Category berhasil dihapus dari database!' });  
    } catch (error) {
        console.error("Error Delete Prisma:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Gagal menghapus! ID mungkin tidak ada di database.',
            error 
        });
    }
};