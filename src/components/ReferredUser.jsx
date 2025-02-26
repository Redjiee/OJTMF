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
  const { id } = useParams(); // Extract memberId from the URL
  const [user, setUser] = useState(null);
  const [referredUsers, setReferredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date for filtering

  // Example mock users (replace with real data)
  const mockUsers = [
    { id: 1, name: "Redjie De Jesus", email: "redjie@gmail.com", contact: "123-456-7890", city: "Bulacan", country: "Philippines", about: "Total Transactions: 10", qr: "🔳 Profile", profileImage: "/taragis.png" },
    { id: 2, name: "Lebron James", email: "lebron@gmail.com", contact: "987-654-3210", city: "Los Angeles", country: "USA", about: "Total Transactions: 5", qr: "🔳 Profile", profileImage: "/taragis.png" },
    { id: 3, name: "Robo Kap", email: "robo@gmail.com", contact: "555-555-5555", city: "Subic", country: "Philippines", about: "Total Transactions: 3", qr: "🔳 Profile", profileImage: "/taragis.png" },
  ];

  // Example mock referred users (replace with real data)
  const mockReferredUsers = [
    { id: 101, name: "Alice Smith", email: "alice@example.com", contact: "123-456-7890", city: "Los Angeles", country: "USA", about: "Marketing Specialist", qr: "🔳 Alice", dateJoined: new Date(2025, 1, 26) },
    { id: 102, name: "Bob Johnson", email: "bob@example.com", contact: "987-654-3210", city: "Chicago", country: "USA", about: "Sales Expert", qr: "🔳 Bob", dateJoined: new Date(2025, 1, 25) },
    { id: 103, name: "Charlie Brown", email: "charlie@example.com", contact: "555-123-4567", city: "Miami", country: "USA", about: "Software Engineer", qr: "🔳 Charlie", dateJoined: new Date(2025, 1, 24) },
  ];

  // Find the user based on the memberId from the URL
  useEffect(() => {
    const selectedUser = mockUsers.find(user => user.id === parseInt(id)); // Extract memberId from URL
    setUser(selectedUser);
    setReferredUsers(mockReferredUsers); // Fetch referred users (replace with real data)
    setSelectedUser(selectedUser);
  }, [id]); // Re-run the effect when the memberId changes

  // Filter referred users based on selected date
  const filteredUsers = selectedDate
    ? referredUsers.filter((user) => isSameDay(user.dateJoined, selectedDate))
    : referredUsers;

  const handleSelectUser = (refUser) => {
    setSelectedUser(refUser);
  };

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
                <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                  <img src={user.profileImage} alt="User Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-center">{selectedUser.name}</h2>
                <p className="text-gray-600 text-center">{selectedUser.city}, {selectedUser.country}</p>
                <p className="font-semibold text-center">{selectedUser.about}</p>
              </div>
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold">Contact Info</h3>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.contact}</p>
              </div>
            </div>

            {/* Right Side - Referred Users Table */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
              <h1 className="text-2xl font-bold mb-4">{user?.name}'s Referred Users</h1>

              {/* Calendar for filtering */}
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

              {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500">No referred users found for the selected date.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-200">
                      <TableHead>Referral ID</TableHead>
                      <TableHead>Referred User</TableHead>
                      <TableHead>Contact Number</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((ref) => (
                      <TableRow
                        key={ref.id}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectUser(ref)}
                      >
                        <TableCell>{ref.id}</TableCell>
                        <TableCell>{ref.name}</TableCell>
                        <TableCell>{ref.contact}</TableCell>
                        <TableCell>{ref.city}</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>{format(ref.dateJoined, "PPP")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ReferredUser;
