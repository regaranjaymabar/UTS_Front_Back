import {Request, Response} from 'express'
import { prisma } from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const {email, password,} = req.body;

    // cek user
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
        return res.status(400).json({ message: "User tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Password salah, coba lagi!" });
    }

    const token = jwt.sign(
        {
            userId: existingUser.id,
            email: existingUser.email
        }, 
        process.env.JWT_SECRET!,
        { expiresIn: '1h' });"";

    return res.status(200).json({ message: "Login berhasil, selamat datang kembali!",
        user: { name: existingUser.name, email: existingUser.email },token
    });
}

export const register = async (req: Request, res: Response) => {
    const {name, email, password, foto} = req.body;

    //validasi input user
    if(!name || !email || !password){
        return res.status(400).json({message: "Nama, email, dan password harus diisi"});
    }

    //cek existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ message: "AWOKAWOKAWOK udah ada yg make emailnya" });
    }

    //buat user baru
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            foto,
        }
    });

    //kembalikan response sukses
    res.status(201).json({message: "Akhirnya ada username yg bisa dipake",
        user:{
            name: newUser.name,
            email: newUser.email
        }
    });

}

