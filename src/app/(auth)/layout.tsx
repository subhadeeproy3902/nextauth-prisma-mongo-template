import { getUser } from "@/actions/user.actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    const dbUser = await getUser(session!.user!.id!);
    if (dbUser) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-muted">
      {children}
    </div>
  );
}
