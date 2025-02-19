import { getUser } from "@/actions/user.actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getAuthenticatedUser() {
  const session = await auth();

  if (!session) {
    redirect(`/register`);
  }

  const dbUser = await getUser(session!.user!.id!);

  if (!dbUser) {
    redirect(`/register`);
  }

  return dbUser;
}
