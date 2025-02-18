import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-muted">
      {children}
    </div>
  );
}