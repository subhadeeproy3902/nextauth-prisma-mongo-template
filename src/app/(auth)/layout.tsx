import { getAuthenticatedUser } from "@/utils/authenticatedUser";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dbUser = await getAuthenticatedUser();
  if (dbUser) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-muted">
      {children}
    </div>
  );
}
