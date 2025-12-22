import { redirect } from "next/navigation";

import { UserRequired } from "@/app/data/user/is-user-authenticated";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";

import OnboardingForm from "@/components/OnboardingForm";

const OnboardingPage = async () => {

  const {data} = await getUserWorkspaces();
  const {user} = await UserRequired();

  if( !data?.onboardingCompleted && data?.workspaces.length > 0 ) {
    redirect("/workspace");
  } else if( data?.onboardingCompleted ) {
    redirect("/create-workspace")
  }

  const name = `${user?.given_name || "" }  ${user?.family_name || ""}`

  return (
    <div className="flex min-w-screen">
      <OnboardingForm 
            name={name}
            email={user?.email}
            image={user?.picture || ""}
            />
      {/* <Button>
        <LogoutLink>Log out</LogoutLink>
      </Button> */}
    </div>
  );
}

export default OnboardingPage;
