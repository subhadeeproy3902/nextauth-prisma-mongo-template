"use server";

import { db } from "@/lib/db";

export async function getUser(uid: string) {
  const user = await db.user.findUnique({
    where: {
      id: uid,
    },
  });

  return user;
}
