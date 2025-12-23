"use server";

import { WorkspaceDataType } from "@/components/workspace/CreateWorkspaceForm";
import { UserRequired } from "../data/user/is-user-authenticated";
import { workspaceSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { generateInviteCode } from "@/utils/generateInviteCode";

export const createWorkspace = async (data: WorkspaceDataType) => {
  try {
    console.log("Workspace data", data);
    const { user } = await UserRequired();

    const validatedData = workspaceSchema.parse(data);

    const userId = user?.id;
    if (!userId) {
      throw new Error("User ID is required");
    }

    const response = await db.workspace.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: userId,
        inviteCode: generateInviteCode(),
        members: {
          create: {
            userId: userId,
            accessLevel: "OWNER",
          },
        },
      },
    });

    return {
      data: response
    }

  } catch (error) {
    console.error("Workspace data", error);
    return {
      status: 500,
      message: "An error occurred while creating the workspace..."
    }
    
  }
  console.log("Workspace data processed!!!", data);
};