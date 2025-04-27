import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) return redirect("/");

  return <div>{children}</div>;
}
