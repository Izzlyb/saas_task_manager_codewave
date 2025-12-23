import { getUserWorkspaces } from '@/app/data/workspace/get-user-workspaces';
import { redirect } from 'next/navigation';

const WorkspacePage = async () => {
  const { data } = await getUserWorkspaces();

  console.log("🚀Workspace Page, getting data from database")
  // if( !data ) {
  //   return null;
  // }
  if( data?.onboardingCompleted && data?.workspaces?.length === 0 ) {
    redirect("/create-workspace");
  } else if( !data?.onboardingCompleted ) {
    redirect("/onboarding");
  } else {
    redirect(`/workspace/${data?.workspaces[0].workspaceId}`);
  }

  return (
    <div>
      Workspace Page
    </div>
  )
}

export default WorkspacePage;
