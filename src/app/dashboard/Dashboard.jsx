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
        <header className="flex h-16 shrink-0 items-center gap-2 bg-white shadow-md rounded-md px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Leader Dashboard</BreadcrumbLink>
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
        <div className="flex flex-col gap-6 p-6">
          {/* Top Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="font-bold text-lg text-gray-700">Total Members</h3>
              <p className="text-2xl font-semibold text-red-600">+2535</p>
              <p className="text-sm text-gray-500">20 Not Activated</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="font-bold text-lg text-gray-700">Total Rewards</h3>
              <p className="text-2xl font-semibold text-red-600">+2535</p>
              <p className="text-sm text-gray-500">20 Not Claimed</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="font-bold text-lg text-gray-700">Total Transactions</h3>
              <p className="text-2xl font-semibold text-green-600">+1250</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Top Referrals */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">TOP REFERRALS</h3>
              <ul className="space-y-3">
                {Array(5)
                  .fill("RUNCEL TIANGCO")
                  .map((name, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <FaUser className="text-gray-800" /> {name}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Right Column - Recent Activities */}
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">RECENT ACTIVITIES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* New Members */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-semibold mb-3 text-gray-700">NEW MEMBERS</h4>
                  <ul className="space-y-3">
                    {Array(5)
                      .fill("RUNCEL TIANGCO")
                      .map((name, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <FaUser className="text-gray-800" /> {name}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Successful Referrals */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="font-semibold mb-3 text-gray-700">SUCCESSFUL REFERRALS</h4>
                  <ul className="space-y-3">
                    {Array(5)
                      .fill("RUNCEL TIANGCO")
                      .map((name, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <FaUser className="text-gray-800" /> {name}
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
