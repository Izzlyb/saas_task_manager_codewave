
import { getUserWorkspaceProjectsByWorkspaceId } from '@/app/data/project/getUserWorkspaceProjectsByWorkspaceId';
import { getUserById } from '@/app/data/user/getUserById';
import { $Enums, User } from '@/generated/prisma/client';
import AppSidebar from './AppSidebar';

export interface AppSidebarDataProps extends User {
  workspaces : {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    accessLevel: $Enums.AccessLevel;
    workspace: {
      name: string;
    }
  }[];
}

const AppSidebarComponent = async ({
  data,
  workspaceId,
}: {
  data: AppSidebarDataProps;
  workspaceId: string;
}) => {
  const { projects, workspaceMembers } =
    await getUserWorkspaceProjectsByWorkspaceId(workspaceId);
  const user = await getUserById();

  return (
    <AppSidebar
      data={data}
      projects={projects}
      workspaceMembers={workspaceMembers}
      user={user as User}
    />
  );
};

export default AppSidebarComponent;
