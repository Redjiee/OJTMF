import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FaUser } from "react-icons/fa"; // Import user icon

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Leader Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="flex flex-col gap-4 p-4">
          {/* Top Cards */}
          <div className="grid grid-cols-2 gap-4 md:w-1/2">
            <div className="bg-gray-200 p-4 rounded-lg shadow">
              <h3 className="font-bold">Total Members</h3>
              <p className="text-xl font-semibold text-red-600">+2535</p>
              <p className="text-sm text-gray-500">20 Not Activated</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow">
              <h3 className="font-bold">Total Rewards</h3>
              <p className="text-xl font-semibold text-red-600">+2535</p>
              <p className="text-sm text-gray-500">20 Not Claimed</p>
            </div>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Column - Top Referrals */}
            <div className="bg-gray-300 p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">TOP REFERRALS</h3>
              <ul className="space-y-2">
                {Array(5)
                  .fill("RUNCEL TIANGCO")
                  .map((name, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaUser className="text-black" /> {name}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Right Column - Recent Activities */}
            <div className="col-span-2 bg-gray-300 p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">RECENT ACTIVITIES</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* New Members */}
                <div className="bg-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">NEW MEMBERS</h4>
                  <ul className="space-y-2">
                    {Array(5)
                      .fill("RUNCEL TIANGCO")
                      .map((name, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FaUser className="text-black" /> {name}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Successful Referrals */}
                <div className="bg-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">SUCCESSFUL REFERRALS</h4>
                  <ul className="space-y-2">
                    {Array(5)
                      .fill("RUNCEL TIANGCO")
                      .map((name, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FaUser className="text-black" /> {name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
