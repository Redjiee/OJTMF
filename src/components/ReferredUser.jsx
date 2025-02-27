import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";

const ReferredUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [referredUsers, setReferredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "Redjie De Jesus", email: "redjie@gmail.com", contact: "123-456-7890", city: "Bulacan", country: "Philippines", about: "Total Referrals: 10", profileImage: "/taragis.png", qrImage: "/qr1.png" },
      { id: 2, name: "Lebron James", email: "lebron@gmail.com", contact: "987-654-3210", city: "Los Angeles", country: "USA", about: "Total Referrals: 3", profileImage: "/taragis.png", qrImage: "/qr1.png" },
      { id: 3, name: "Robo Kap", email: "robo@gmail.com", contact: "555-555-5555", city: "Subic", country: "Philippines", about: "Total Referrals: 3", profileImage: "/taragis.png", qrImage: "/q1.png" },
    ];

    const mockReferredUsers = [
      { id: 101, name: "Alice Smith", contact: "123-456-7890", city: "Los Angeles", status: "Active", dateJoined: new Date(2025, 1, 26), additionalInfo: "Gold Member" },
      { id: 102, name: "Bob Johnson", contact: "987-654-3210", city: "Chicago", status: "Inactive", dateJoined: new Date(2025, 1, 25), additionalInfo: "Silver Member" },
      { id: 103, name: "Charlie Brown", contact: "555-123-4567", city: "Miami", status: "Active", dateJoined: new Date(2025, 1, 24), additionalInfo: "Bronze Member" },
    ];

    const selectedUser = mockUsers.find(user => user.id === parseInt(id));
    setUser(selectedUser);
    setReferredUsers(mockReferredUsers);
    setSelectedUser(selectedUser);
  }, [id]);

  const filteredUsers = selectedDate
    ? referredUsers.filter((user) => isSameDay(user.dateJoined, selectedDate))
    : referredUsers;

  if (!selectedUser) return <p className="text-center">Loading user data...</p>;

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 bg-gray-100 flex flex-col">
          {/* Top Navigation Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button variant="default" onClick={() => navigate(`/referred-users/${selectedUser.id}`)} className="bg-blue-600 text-white">
              Referred User
            </Button>
            <Button variant="outline" onClick={() => navigate(`/transaction-history/${selectedUser.id}`)}>
              Transaction History
            </Button>
            <Button variant="outline" onClick={() => navigate(`/reward-history/${selectedUser.id}`)}>
              Reward History
            </Button>
            <Button variant="outline" onClick={() => navigate(`/conversion-history/${selectedUser.id}`)}>
              Conversion History
            </Button>
          </div>

          <div className="flex flex-1">
            {/* Left Side - Profile Info */}
            <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 mr-6">
              <div className="flex flex-col items-center">
                <div className="bg-gray-1000 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full flex items-center justify-center mb-4">
                  <img src={user.profileImage} alt="User Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-center">{selectedUser.name}</h2>
                <p className="text-gray-600 text-center">{selectedUser.city}, {selectedUser.country}</p>
                <p className="font-semibold text-center">{selectedUser.about}</p>
                <div className="mt-4">
                  <img src={user.qrImage} alt="QR Code" className="w-32 h-32" />
                </div>
              </div>
            </div>

            {/* Right Side - Referred Users Table */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-4">{user?.name}'s Referred Users</h1>

              {/* Calendar for Filtering */}
              <div className="flex items-center mb-4 space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {selectedDate ? format(selectedDate, "PPP") : "Select Date Joined"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                  </PopoverContent>
                </Popover>
                {selectedDate && (
                  <Button variant="ghost" onClick={() => setSelectedDate(null)}>
                    Reset Filter
                  </Button>
                )}
              </div>

              {/* Referred Users Table */}
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead className="text-center whitespace-nowrap">Referral ID</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Referred User</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Contact Number</TableHead>
                    <TableHead className="text-center whitespace-nowrap">City</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Date Joined</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Additional Info</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((ref) => (
                    <TableRow key={ref.id} className="cursor-pointer hover:bg-gray-100">
                      <TableCell className="text-center whitespace-nowrap">{ref.id}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{ref.name}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{ref.contact}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{ref.city}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{ref.status}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{format(ref.dateJoined, "PPP")}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{ref.additionalInfo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ReferredUser;
