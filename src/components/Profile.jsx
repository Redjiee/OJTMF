import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const memberId = location.state?.memberId;

  const members = [
    { id: 1, qr: "/taragis.png", name: "Redjie M. De jesus", gender: "Male", phone: "123-456-7890", dateRegistered: "2024-02-01", kycVerified: true, activated: true, firstName: "Redjie", lastName: "De jesus", email: "redjie@gmail.com", city: "Bulacan", country: "Philippines", about: "Computer Engineer" },
    { id: 2, qr: "/taragis.png", name: "Lebron J. James Sr.", gender: "Male", phone: "987-654-3210", dateRegistered: "2024-02-05", kycVerified: false, activated: true, firstName: "Lebron", lastName: "James", email: "lebrown@gmail.com", city: "Los Angeles", country: "USA", about: "Basketball Athlete" },
    { id: 3, qr: "/taragis.png", name: "Robo C. Kap III", gender: "Female", phone: "456-789-1230", dateRegistered: "2024-02-10", kycVerified: false, activated: false, firstName: "Robo", lastName: "Kap", email: "robokap@gmail.com", city: "Subic", country: "Philippines", about: "Kalbo" },
  ];

  const member = members.find((m) => m.id === memberId);

  if (!member) return <p className="text-center">No member data found.</p>;

  const username = member.firstName ? member.firstName.toLowerCase() : "N/A";

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <main className="flex-1 p-12 bg-gray-100 flex flex-col w-full items-center">
          <div className="mb-0 w-full flex justify-center space-x-8 bg-white shadow-md p-6 rounded-lg">
            <Button variant="outline" className="px-8 py-4 rounded-lg hover:bg-gray-200" onClick={() => navigate(`/referred-users/${member.id}`)}>
              Referred User
            </Button>
            <Button variant="outline" className="px-8 py-4 rounded-lg hover:bg-gray-200" onClick={() => navigate(`/transaction-history/${member.id}`)}>
              Transaction History
            </Button>
            <Button variant="outline" className="px-8 py-4 rounded-lg hover:bg-gray-200" onClick={() => navigate(`/reward-history/${member.id}`)}>
              Reward History
            </Button>
            <Button variant="outline" className="px-8 py-4 rounded-lg hover:bg-gray-200" onClick={() => navigate(`/conversion-history/${member.id}`)}>
              Conversion History
            </Button>
          </div>

          <div className="w-full max-w-screen-2xl bg-white shadow-lg rounded-lg p-20 flex flex-col lg:flex-row mt-0">
            <div className="w-full lg:w-1/3 flex flex-col items-center border-r lg:pr-16 mb-8 lg:mb-0">
              <div className="bg-gray-300 w-72 h-72 rounded-full flex items-center justify-center mb-6">
                <img src={member.qr} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
              <h2 className="text-5xl font-bold text-center">{member.name}</h2>
              <p className="text-gray-600 text-center text-2xl">{member.city}, {member.country}</p>
              <p className="font-semibold text-center text-2xl">{member.about}</p>
            </div>

            <div className="w-full lg:w-2/3 pl-8 flex-grow">
              <div className="border-b pb-8 mb-8">
                <h3 className="text-4xl font-semibold">User Information</h3>
                <div className="grid grid-cols-2 gap-8 mt-6 text-2xl">
                  <p><strong>Username:</strong> {username}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>First Name:</strong> {member.firstName}</p>
                  <p><strong>Last Name:</strong> {member.lastName}</p>
                </div>
              </div>

              <div className="border-b pb-8 mb-8">
                <h3 className="text-4xl font-semibold">Contact Information</h3>
                <div className="grid grid-cols-3 gap-8 mt-6 text-2xl">
                  <p><strong>City:</strong> {member.city}</p>
                  <p><strong>Country:</strong> {member.country}</p>
                  <p><strong>Postal Code:</strong> {member.postalCode}</p>
                </div>
              </div>

              <div className="pb-8">
                <h3 className="text-4xl font-semibold">About Me</h3>
                <p className="text-gray-700 text-2xl">{member.about}</p>
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="px-12 py-6 text-2xl bg-gray-300 hover:bg-gray-500" onClick={() => window.history.back()}>Go Back</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Profile;
