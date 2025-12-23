import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import AppSidebarComponent from "@/components/sidebar/AppSidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: Promise<{workspaceId: string}>;
}

const WorkspaceIdLayout = async ({
  children,
  params
} : Props ) => {

  const {workspaceId} = await params;

  const {data} = await getUserWorkspaces();

  if( data?.onboardingCompleted && !data?.workspaces ) {
    redirect('/create-workspace');
  } else if( !data?.onboardingCompleted ) {
    redirect('/onboarding')
  }

  return (
    <SidebarProvider>
      <div className='w-full flex bg-background h-screen'>
        <p>the Workspace Id is: {workspaceId}</p>
        <AppSidebarComponent data={data} workspaceId={workspaceId} />

        <main className='w-full overflow-y-auto min-h-screen'>
          <div className='flex items-start'>
            <SidebarTrigger className='pt-3' />
            {/* <Navbar
              id={data?.id}
              name={data.name as string}
              email={data.email as string}
              image={data.image as string}
            /> */}
          </div>
          <div className='p-0 md:p-4 pt-2'>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default WorkspaceIdLayout;
