import { User } from "@/generated/prisma/client";
import { AppSidebarDataProps } from "./AppSidebarComponent";



const AppSidebar = ({} : {
  data: AppSidebarDataProps;
  projects: ProjectsProps;
  workspaceMembers: WorkspaceMembersProps[];
  user: User;
}) => {
  return (
    <div>App Sidebar</div>
  )
}

export default AppSidebar