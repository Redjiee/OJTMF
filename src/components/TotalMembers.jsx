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
    { id: 1, qr: "/taragis.png", name: "Redjie M. De jesus", gender: "Male", phone: "123-456-7890", dateRegistered: "2024-02-01", kycVerified: true, activated: true },
    { id: 2, qr: "/taragis.png", name: "Lebron J. James Sr.", gender: "Male", phone: "987-654-3210", dateRegistered: "2024-02-05", kycVerified: false, activated: true },
    { id: 3, qr: "/taragis.png", name: "Robo C. Kap III", gender: "Female", phone: "456-789-1230", dateRegistered: "2024-02-10", kycVerified: false, activated: false },
  ];

  return (
    <SidebarProvider>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:block lg:w-1/4 w-full">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Total Members</h2>
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Qr CODE</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Date Registered</TableHead>
                  <TableHead>KYC Verified</TableHead>
                  <TableHead>Activated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="w-16 lg:w-32">
                      <img src={member.qr} alt={`QR for ${member.name}`} className="w-full h-auto rounded-full" />
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.gender}</TableCell>
                    <TableCell className="lg:block hidden">{member.phone}</TableCell>
                    <TableCell>{member.dateRegistered}</TableCell>
                    <TableCell>
                      {member.kycVerified ? (
                        <span className="text-green-500">✔ Yes</span>
                      ) : (
                        <span className="text-red-500">✘ No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {member.activated ? (
                        <span className="text-green-500">✔ Yes</span>
                      ) : (
                        <span className="text-red-500">✘ No</span>
                      )}
                    </TableCell>
                    <TableCell className="flex space-x-2">

                      {/* Three-dot actions */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                            <span className="text-lg">...</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <ul className="space-y-2">
                            <li>
                              <Button
                                variant="link"
                                onClick={() => alert(`KYC URL copied for ${member.name}`)} // This is a placeholder, you can implement the real "Copy KYC URL" logic.
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
