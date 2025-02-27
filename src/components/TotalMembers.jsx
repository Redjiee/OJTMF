import React from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

function TotalMembers() {
  const navigate = useNavigate();

  const members = [
    { id: 1, qr: "/qr1.png", name: "Redjie M. De jesus", gender: "Male", phone: "123-456-7890", dateRegistered: "2024-02-01", kycVerified: true, activated: true },
    { id: 2, qr: "/qr1.png", name: "Lebron J. James Sr.", gender: "Male", phone: "987-654-3210", dateRegistered: "2024-02-05", kycVerified: false, activated: true },
    { id: 3, qr: "/qr1.png", name: "Robo C. Kap III", gender: "Female", phone: "456-789-1230", dateRegistered: "2024-02-10", kycVerified: false, activated: false },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 p-10 bg-gray-100">
          <h2 className="text-3xl font-semibold mb-6">Total Members</h2>

          <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Qr CODE</TableHead>
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">Gender</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Phone Number</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Date Registered</TableHead>
                  <TableHead className="text-center whitespace-nowrap">KYC Verified</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Activated</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="w-20 lg:w-32 text-center">
                      <img src={member.qr} alt={`QR for ${member.name}`} className="w-16 h-16 lg:w-24 lg:h-24 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">{member.name}</TableCell>
                    <TableCell className="text-center">{member.gender}</TableCell>
                    <TableCell className="text-center">{member.phone}</TableCell>
                    <TableCell className="text-center">{member.dateRegistered}</TableCell>
                    <TableCell className="text-center">
                      {member.kycVerified ? (
                        <span className="text-green-500 font-semibold">✔ Yes</span>
                      ) : (
                        <span className="text-red-500 font-semibold">✘ No</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {member.activated ? (
                        <span className="text-green-500 font-semibold">✔ Yes</span>
                      ) : (
                        <span className="text-red-500 font-semibold">✘ No</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {/* Three-dot actions */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <span className="text-lg">...</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <ul className="space-y-2">
                            <li>
                              <Button
                                variant="link"
                                onClick={() => alert(`KYC URL copied for ${member.name}`)}
                              >
                                Copy KYC URL
                              </Button>
                            </li>
                            <li>
                              <Button
                                variant="link"
                                onClick={() => navigate(`/profile/${member.id}`, { state: { memberId: member.id } })}
                              >
                                View Profile
                              </Button>
                            </li>
                          </ul>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default TotalMembers;
