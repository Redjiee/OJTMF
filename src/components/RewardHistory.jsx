import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to extract the memberId
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";

const RewardHistory = () => {
  const { id } = useParams(); // Extract memberId from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date for filtering

  useEffect(() => {
    // Mock user data based on memberId (you should fetch actual user data here)
    const mockUsers = [
      { id: 1, name: "Redjie De Jesus", email: "redjie@gmail.com", contact: "123-456-7890", city: "Bulacan", country: "Philippines", about: "Total Rewards: 5", profileImage: "/taragis.png" },
      { id: 2, name: "Lebron James", email: "lebron@gmail.com", contact: "987-654-3210", city: "Los Angeles", country: "USA", about: "Total Rewards: 3", profileImage: "/taragis.png" },
      { id: 3, name: "Robo Kap", email: "robo@gmail.com", contact: "555-555-5555", city: "Subic", country: "Philippines", about: "Total Rewards: 2", profileImage: "/taragis.png" },
    ];

    // Mock reward data
    const mockRewards = [
      { id: 1, sourceType: "Referral", rewardType: "Cashback", points: 100, date: new Date(2025, 1, 26) },
      { id: 2, sourceType: "Purchase", rewardType: "Voucher", points: 50, date: new Date(2025, 1, 25) },
      { id: 3, sourceType: "Referral", rewardType: "Discount", points: 200, date: new Date(2025, 1, 24) },
    ];

    // Find the user based on id
    const selectedUser = mockUsers.find(user => user.id === parseInt(id)); // Parse id as integer
    setUser(selectedUser); // Set the user data based on the id
    setRewards(mockRewards); // Set the reward data (replace with API call as needed)
  }, [id]); // Re-run the effect when memberId changes

  // Filter rewards based on selected date
  const filteredRewards = selectedDate
    ? rewards.filter((reward) => isSameDay(reward.date, selectedDate))
    : rewards;

  if (!user) {
    return <p className="text-center">Loading user data...</p>;
  }

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 bg-gray-100 flex flex-col">
          {/* Top Navigation Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button variant="outline" onClick={() => navigate(`/referred-users/${user.id}`)}>
              Referred User
            </Button>
            <Button variant="outline" onClick={() => navigate(`/transaction-history/${user.id}`)}>
              Transaction History
            </Button>
            <Button variant="default" onClick={() => navigate(`/reward-history/${user.id}`)} className="bg-blue-600 text-white">
              Reward History
            </Button>
            <Button variant="outline" onClick={() => navigate(`/conversion-history/${user.id}`)}>
              Conversion History
            </Button>
          </div>

          <div className="flex flex-1">
            {/* Left Side - Profile Info */}
            <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 mr-6">
              <div className="flex flex-col items-center">
                {/* Profile Image */}
                <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-center mb-4">
                  <img src={user.profileImage} alt="User Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-center">{user.name}</h2>
                <p className="text-gray-600 text-center">{user.city}, {user.country}</p>
                <p className="font-semibold text-center">{user.about}</p>
              </div>
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold">Contact Info</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.contact}</p>
              </div>
            </div>

            {/* Right Side - Calendar & Rewards Table */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
              <h1 className="text-2xl font-bold mb-4">Reward History</h1>

              {/* Calendar for filtering */}
              <div className="flex items-center mb-4 space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {selectedDate ? format(selectedDate, "PPP") : "Select Date Earned"}
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

              {filteredRewards.length === 0 ? (
                <p className="text-center text-gray-500">No rewards available for the selected date.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-200">
                      <TableHead>Reward ID</TableHead>
                      <TableHead>Source Type</TableHead>
                      <TableHead>Reward Type</TableHead>
                      <TableHead>Points Earned</TableHead>
                      <TableHead>Date Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRewards.map((reward) => (
                      <TableRow key={reward.id} className="cursor-pointer hover:bg-gray-100">
                        <TableCell>{reward.id}</TableCell>
                        <TableCell>{reward.sourceType}</TableCell>
                        <TableCell>{reward.rewardType}</TableCell>
                        <TableCell>{reward.points}</TableCell>
                        <TableCell>{format(reward.date, "PPP")}</TableCell>
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

export default RewardHistory;
