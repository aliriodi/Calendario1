import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password, role } = body;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({  email: normalizedEmail, });

    if (existingUser) {
      return NextResponse.json(
        {
          ok: false,
          error: "Ese email ya está registrado",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
    });

    return NextResponse.json({
      ok: true,
      message: "Usuario creado correctamente",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}