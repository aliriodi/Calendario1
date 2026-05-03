import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      ok: true,
      message: "Conexión a MongoDB exitosa",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Error conectando a MongoDB",
        error: error.message,
      },
      { status: 500 }
    );
  }
}