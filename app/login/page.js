"use client";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import Bloque1 from "@/componente/Bloque1"
import Footer from "@/componente/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const { data: session, status } = useSession();
  //Para ver si hay session activa
  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
  
      if (session) {
        if (session.user.role === "admin") {
          router.push("/admin/users");
        } else {
          router.push("/");
        }
      } else {
        setCheckingSession(false);
      }
    }
  
    checkSession();
  }, []); 


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  
    if (res?.error) {
      setLoading(false);
      setError("Credenciales inválidas");
      return;
    }
  
    // 🔥 Obtener sesión actualizada
    const session = await getSession();
  
    setLoading(false);
  
    // 🔥 Redirección según rol
    if (session?.user?.role === "admin") {
      router.push("/admin/users");
    } else {
      router.push("/");
    }
  
    router.refresh();
  }

  return (<>
   {session && <Bloque1/>}
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
        
      <div className="w-full max-w-3xl rounded-[26px] bg-[#ededf1] shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#d9dbe1] px-8 py-10 md:px-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f446f]">
            Informacion de la Cuenta
          </h1>
          <p className="mt-2 text-lg text-[#4f6787]">
            Introducir los campos necesarios
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="mb-2 block text-lg font-medium text-black">
              Email o usuario
            </label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full rounded-2xl border border-[#d5d9e2] bg-[#f5f5f8] px-4 text-lg text-black outline-none transition focus:border-[#014C6D] focus:ring-2 focus:ring-[#014C6D]/15"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-lg font-medium text-black">
              Clave
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su clave"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 w-full rounded-2xl border border-[#d5d9e2] bg-[#f5f5f8] px-4 pr-12 text-lg text-black outline-none transition focus:border-[#014C6D] focus:ring-2 focus:ring-[#014C6D]/15"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#014C6D]"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-between">
            
            <button
              type="button"
              onClick={() => {router.push("/");
              router.refresh();}}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-[#014C6D] px-6 text-[#014C6D] hover:bg-[#014C6D]/5"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#014C6D] px-8 text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Next"}
              {!loading && <ChevronRight size={18} />}
            </button>

          </div>
        </form>
      </div>
    </main>
    {session &&  <Footer />}
    
    </>
  );
}