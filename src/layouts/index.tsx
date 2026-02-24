import { Outlet } from "react-router"
import SidebarPage from "../features/sidebar/pages"


const MainLayout = () => {
  return (
    <>
      <SidebarPage >
        <Outlet />
      </SidebarPage>
    </>
  )


}

export default MainLayout
