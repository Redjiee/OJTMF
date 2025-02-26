import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate(); // Navigation handler

  // Get the member ID from the state passed via navigate
  const memberId = location.state?.memberId;

  // List of members (mock data)
  const members = [
    { id: 1, qr: "/taragis.png", name: "Redjie M. De jesus", gender: "Male", phone: "123-456-7890", dateRegistered: "2024-02-01", kycVerified: true, activated: true, firstName: "Redjie", lastName: "De jesus", email: "redjie@gmail.com", city: "Bulacan", country: "Philippines", about: "Computer Engineer" },
    { id: 2, qr: "/taragis.png", name: "Lebron J. James Sr.", gender: "Male", phone: "987-654-3210", dateRegistered: "2024-02-05", kycVerified: false, activated: true, firstName: "Lebron", lastName: "James", email: "lebrown@gmail.com", city: "Los Angeles", country: "USA", about: "Basketball Athlete" },
    { id: 3, qr: "/taragis.png", name: "Robo C. Kap III", gender: "Female", phone: "456-789-1230", dateRegistered: "2024-02-10", kycVerified: false, activated: false, firstName: "Robo", lastName: "Kap", email: "robokap@gmail.com", city: "Subic", country: "Philippines", about: "Kalbo" },
  ];

  // Find the member by ID
  const member = members.find((m) => m.id === memberId);

  if (!member) return <p className="text-center">No member data found.</p>;

  // Safely handle `firstName` to avoid errors
  const username = member.firstName ? member.firstName.toLowerCase() : "N/A";

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 bg-gray-100 flex flex-col items-center">
          {/* Navigation Buttons at the Top */}
          <div className="mb-4 w-full max-w-4xl flex justify-between">
            <Button variant="outline" onClick={() => navigate(`/referred-users/${member.id}`)}>
              Referred User
            </Button>
            <Button variant="outline" onClick={() => navigate(`/transaction-history/${member.id}`)}>
              Transaction History
            </Button>
            <Button variant="outline" onClick={() => navigate(`/reward-history/${member.id}`)}>
              Reward History
            </Button>
            <Button variant="outline" onClick={() => navigate(`/conversion-history/${member.id}`)}>
              Conversion History
            </Button>
          </div>

          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex self-start">
            {/* Left Side - Profile Info */}
            <div className="w-1/3 flex flex-col items-center border-r pr-6">
              <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                <img src={member.qr} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
              <h2 className="text-xl font-bold text-center">{member.name}</h2>
              <p className="text-gray-600 text-center">{member.city}, {member.country}</p>
              <p className="font-semibold text-center">{member.about}</p>
            </div>

            {/* Right Side - User Details */}
            <div className="w-2/3 pl-6 flex-grow">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold">User Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <p><strong>Username:</strong> {username}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>First Name:</strong> {member.firstName}</p>
                  <p><strong>Last Name:</strong> {member.lastName}</p>
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p><strong>Address:</strong> {member.address}</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <p><strong>City:</strong> {member.city}</p>
                  <p><strong>Country:</strong> {member.country}</p>
                  <p><strong>Postal Code:</strong> {member.postalCode}</p>
                </div>
              </div>

              <div className="pb-4">
                <h3 className="text-lg font-semibold">About Me</h3>
                <p className="text-gray-700">{member.about}</p>
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Profile;
