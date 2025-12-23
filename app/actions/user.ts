"use server";

import { UserDataType } from "@/components/OnboardingForm";
import { UserRequired } from "../data/user/is-user-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
  const { user } = await UserRequired();
  const validatedData = userSchema.parse(data);

  if( !data ) {
    return null;
  }

  console.log("✨CreateUser function...👋");

  const userData = await db.user.create({
    data: {
      id: user?.id || "",
      email: user?.email as string,
      name: user?.family_name || "",
      phoneNumber: "(305) 239-9234",
      about: validatedData.about,
      country: validatedData.country,
      industryType: validatedData.industryType,
      role: validatedData.role,
      onboardingCompleted: true,
      image: user?.picture || "",
      subscriptions: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
          currentPeriodEnd: new Date(),
          cancelAtPeriodEnd: false,
          frequency: ""
        },
      },
    },

    select : {
      id: true,
      name: true,
      email: true,
      workspaces: true,
    }
  });
  // TODO: send user welcom email

  if( userData.workspaces.length === 0 ) {
    redirect( "/create-workspace");
  }

  redirect("/workspace")
};
