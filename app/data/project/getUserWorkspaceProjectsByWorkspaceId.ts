import { db } from "@/lib/db";
import { UserRequired } from "../user/is-user-authenticated";
import { redirect } from "next/navigation";
import { AccessLevel } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";


export const getUserWorkspaceProjectsByWorkspaceId = async (workspaceId: string) => {
  try {
    const { user } = await UserRequired();

    if (!user) {
      redirect("/onboarding");
    }

    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      throw new Error(`User ${user.id} is not member of the workspace.`);
    }

    const query: Prisma.ProjectWhereInput =
      isUserMember.accessLevel === AccessLevel.OWNER
        ? { workspaceId }
        : { projectAccess: {
          some: {
            hasAccess: true,
            workspaceMember: {
              userId: user.id, workspaceId
            }
          }
        }};

      
    const [projects, workspaceMembers] = await Promise.all([
        db.project.findMany({
          where: query,
          select: { name : true, id: true, workspaceId: true, description: true }
        }),
        db.workspaceMember.findMany({
          where: {workspaceId},
          include: {
            user: {
              select: { name: true, id: true, image: true, accessLevel: true}
            }
          }
        })
    ]);

    return { projects, workspaceMembers }

  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: true,
      message: "Failed to fetch projects by WorkspaceId",
      status: 500,
    };
  }
};