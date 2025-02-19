import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import Topbar from "../components/shared/Topbar";
import Bottombar from "../components/shared/Bottombar";

// == step 30 to create comp
export default function RootLayout() {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        {/* it will render the child routes of Rootlayout by default is home because we set index on home celement */}
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
}

// == step 31 to create topbar.tsx
