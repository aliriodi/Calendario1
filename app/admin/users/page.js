import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Logout from "@/componente/Logout";
import CreateUserForm from "@/componente/CreateUserForm";
import Bloque1 from "@/componente/Bloque1";
import Footer from "@/componente/Footer";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      {/* <h1>Panel Admin</h1>
      <p>Bienvenido {session.user.name}</p>
      <p>Rol: {session.user.role}</p> */}
     
      <Bloque1 > </Bloque1>
      <><CreateUserForm /></>
      <>{false && <Logout />}</>
      <Footer />
    </div>
  );
}