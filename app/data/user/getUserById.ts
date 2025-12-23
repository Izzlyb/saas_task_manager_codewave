
import { db } from "@/lib/db";

import { UserRequired } from "./is-user-authenticated"

export const getUserById = async () => {
  try {
    const {user} = await UserRequired();

    const data = await db.user.findUnique({
      where: { id: user?.id }
    });

    return data;
    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: true,
      message: "Failed to fetch projects by WorkspaceId",
      status: 500,
    };
  }
}