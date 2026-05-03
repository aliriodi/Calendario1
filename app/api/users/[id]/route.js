import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "No autenticado" },
        { status: 401 }
      );
    }
    if (session.user.role !== "admin") {
        return NextResponse.json(
          { ok: false, error: "No autorizado" },
          { status: 403 }
        );
      }


    await connectDB();

    const { id } = await params;
    const body = await req.json();

    console.log("id:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, error: "ID inválido" },
        { status: 400 }
      );
    }

    const { name, email, password, role } = body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const userUpdated = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!userUpdated) {
      return NextResponse.json(
        { ok: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        _id: userUpdated._id,
        name: userUpdated.name,
        email: userUpdated.email,
        role: userUpdated.role,
      },
    });
  } catch (error) {
    console.error("ERROR PUT USER:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
          return NextResponse.json(
            { ok: false, error: "No autenticado" },
            { status: 401 }
          );
        }
      await connectDB();
  
      const { id } = await params;
  
      console.log("GET id:", id);
  
      // validar que el id sea válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { ok: false, error: "ID inválido" },
          { status: 400 }
        );
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return NextResponse.json(
          { ok: false, error: "Usuario no encontrado" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        ok: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error("ERROR GET USER:", error);
  
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }
  }