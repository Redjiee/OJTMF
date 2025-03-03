import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";

const RewardHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "Redjie De Jesus", email: "redjie@gmail.com", contact: "123-456-7890", city: "Bulacan", country: "Philippines", about: "Total Rewards: 5", profileImage: "/taragis.png" },
      { id: 2, name: "Lebron James", email: "lebron@gmail.com", contact: "987-654-3210", city: "Los Angeles", country: "USA", about: "Total Rewards: 3", profileImage: "/taragis.png" },
      { id: 3, name: "Robo Kap", email: "robo@gmail.com", contact: "555-555-5555", city: "Subic", country: "Philippines", about: "Total Rewards: 2", profileImage: "/taragis.png" },
    ];

    const mockRewards = [
      { id: 1, sourceType: "Referral", rewardType: "Cashback", points: 100, date: new Date(2025, 1, 26), status: "Completed", notes: "Cashback processed successfully" },
      { id: 2, sourceType: "Purchase", rewardType: "Voucher", points: 50, date: new Date(2025, 1, 25), status: "Pending", notes: "Voucher pending approval" },
      { id: 3, sourceType: "Referral", rewardType: "Discount", points: 200, date: new Date(2025, 1, 24), status: "Completed", notes: "Discount applied to next purchase" },
    ];

    const selectedUser = mockUsers.find(user => user.id === parseInt(id));
    setUser(selectedUser);
    setRewards(mockRewards);
  }, [id]);

  const filteredRewards = selectedDate
    ? rewards.filter(reward => isSameDay(reward.date, selectedDate))
    : rewards;

  if (!user) {
    return <p className="text-center">Loading user data...</p>;
  }

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-3 bg-gray-100 flex flex-col">
          {/* Top Navigation Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button variant="outline" onClick={() => navigate(`/referred-users/${user.id}`)}>Referred User</Button>
            <Button variant="outline" onClick={() => navigate(`/transaction-history/${user.id}`)}>Transaction History</Button>
            <Button variant="default" className="bg-blue-600 text-white">Reward History</Button>
            <Button variant="outline" onClick={() => navigate(`/conversion-history/${user.id}`)}>Conversion History</Button>
          </div>

          <div className="flex flex-1">
            {/* Left Side - Profile Info */}
            <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 mr-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full flex items-center justify-center mb-4">
                  <img src={user.profileImage} alt="User Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-center">{user.name}</h2>
                <p className="text-gray-600 text-center">{user.city}, {user.country}</p>
                <p className="font-semibold text-center">{user.about}</p>
              </div>
            </div>

            {/* Right Side - Calendar & Reward History Table */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-4">Reward History</h1>

              {/* Calendar for filtering */}
              <div className="flex items-center mb-6 space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="px-6 py-2 text-lg">
                      {selectedDate ? format(selectedDate, "PPP") : "Select Date Earned"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                  </PopoverContent>
                </Popover>
                {selectedDate && (
                  <Button variant="ghost" onClick={() => setSelectedDate(null)} className="px-6 py-2 text-lg">
                    Reset Filter
                  </Button>
                )}
              </div>

              {/* Reward History Table */}
              <div className="overflow-auto">
                <Table className="table-auto w-full whitespace-nowrap">
  <TableHeader>
    <TableRow className="bg-gray-200">
      <TableHead className="text-center whitespace-nowrapr">Reward ID</TableHead>
      <TableHead className="text-center whitespace-nowrap">Source Type</TableHead>
      <TableHead className="ttext-center whitespace-nowrap">Reward Type</TableHead>
      <TableHead className="text-center whitespace-nowrap">Points Earned</TableHead>
      <TableHead className="text-center whitespace-nowrap">Date Earned</TableHead>
      <TableHead className="text-center whitespace-nowrap">Status</TableHead>
      <TableHead className="ttext-center whitespace-nowrap">Notes</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredRewards.map(reward => (
      <TableRow key={reward.id} className="cursor-pointer hover:bg-gray-100">
        <TableCell className="text-center whitespace-nowrap">{reward.id}</TableCell>
        <TableCell className="text-center whitespace-nowrap">{reward.sourceType}</TableCell>
        <TableCell className="text-center whitespace-nowrap">{reward.rewardType}</TableCell>
        <TableCell className="text-center whitespace-nowrap">{reward.points}</TableCell>
        <TableCell className="text-center whitespace-nowrap">{format(reward.date, "PPP")}</TableCell>
        <TableCell className="text-center whitespace-nowrap">{reward.status}</TableCell>
        <TableCell className="text-center whitespace-nowrap">{reward.notes}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RewardHistory;
