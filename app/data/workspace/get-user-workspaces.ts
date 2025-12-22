import { db } from "@/lib/db";
import { UserRequired } from "../user/is-user-authenticated"

export const getUserWorkspaces = async () => {
  try {
    const {user} = await UserRequired();

    const workspaces = await db.user.findUnique({
      where : {id: user!.id },
      include : {
        workspaces: {
          select: {
            id: true,
            userId: true,
            workspaceId: true,
            accessLevel: true,
            createdAt: true, 
            workspace: { select: { name: true }}
          }
        }
      }
    });
    
    return { data:workspaces};

  } catch (error) {
    console.error(error)
    return { 
      success: false,
      error: true,
      message: "Failed to fetch workspaces",
      status: 500,
    };
  }
}
