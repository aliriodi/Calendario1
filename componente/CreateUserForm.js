"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Logout from "@/componente/Logout"
export default function CreateUserForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error creando usuario");
        return;
      }

      setMessage("Usuario creado correctamente");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
    } catch (err) {
      setError("Error del servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
    {/* // <div className="min-h-screen bg-[#f7f7fb] px-6 py-10"> */}
      <div className="mx-auto max-w-3xl rounded-3xl bg-[#f7f7fb] p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-slate-700">
            Informacion de la Cuenta Nueva
          </h2>
          <p className="mt-2 text-lg text-slate-500">
            Introducir los campos necesarios
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* NAME */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-lg font-medium text-black">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                placeholder="John"
                value={form.name}
                onChange={handleChange}
                required
                className="h-14 w-full rounded-xl border text-black border-slate-200 px-4 text-lg outline-none focus:border-[#014C6D] focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-lg font-medium text-black">
                Email o cuenta de usuario
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="johndoe@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
                className="h-14 w-full rounded-xl border text-black border-slate-200 px-4 text-lg outline-none focus:border-[#014C6D] focus:ring-2 focus:ring-sky-100"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="mb-2 block text-lg font-medium text-black">
                Rol
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border text-black border-slate-200 px-4 text-lg outline-none focus:border-[#014C6D] focus:ring-2 focus:ring-sky-100"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label className=" mb-2 block text-lg font-medium text-black">
                Clave
              </label>
              <input
                 type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="h-14 w-full rounded-xl border text-black border-slate-200 px-4 pr-12 text-lg outline-none focus:border-[#014C6D] focus:ring-2 focus:ring-sky-100"
              />
              {!showPassword ? (
  <EyeOff
    size={18}
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-[52px] cursor-pointer text-gray-500 hover:text-black transition"
  />
) : (
  <Eye
    size={18}
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-[52px] cursor-pointer  text-gray-500 hover:text-black transition"
  />
)}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <label className="mb-2 block text-lg font-medium text-black">
                Confirmar Clave
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="h-14 w-full rounded-xl border text-black border-slate-200 px-4 pr-12 text-lg outline-none focus:border-[#014C6D] focus:ring-2 focus:ring-sky-100"
              />
            {!showConfirm ? (
  <EyeOff
    size={18}
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute right-4 top-[52px] cursor-pointer  text-gray-500 hover:text-black transition"
  />
) : (
  <Eye
    size={18}
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute right-4 top-[52px] cursor-pointer  text-gray-500 hover:text-black transition"
  />
)}
            </div>
          </div>

          {(message || error) && (
            <div>
              {message && <p className="text-green-600">{message}</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={()=> {
                router.push("/login");
                router.refresh();
              }}
              className="flex items-center gap-2 rounded-xl cursor-pointer border border-[#014C6D] px-5 py-2 text-[#014C6D] hover:bg-sky-50"
            >
              <ChevronLeft size={16} /> Back
            </button>
               <Logout />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl cursor-pointer bg-[#014C6D] px-6 py-2 text-white hover:bg-[#288bb5]"
            >
              {loading ? "Creating..." : "Next"}
              <ChevronRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}