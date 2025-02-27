import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";

const TransactionHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "Redjie De Jesus", email: "redjie@gmail.com", contact: "123-456-7890", city: "Bulacan", country: "Philippines", about: "Total Transactions: 10", qr: "/taragis.png" },
      { id: 2, name: "Lebron James", email: "lebron@gmail.com", contact: "987-654-3210", city: "Los Angeles", country: "USA", about: "Total Transactions: 3", qr: "/taragis.png" },
      { id: 3, name: "Robo Kap", email: "robo@gmail.com", contact: "555-555-5555", city: "Subic", country: "Philippines", about: "Total Transactions: 3", qr: "/taragis.png" },
    ];

    const mockTransactions = [
      { id: 1, memberName: "John Doe", type: "Deposit", amount: 100, date: new Date(2025, 1, 26), status: "Completed", notes: "Transaction processed successfully" },
      { id: 2, memberName: "Alice Smith", type: "Withdrawal", amount: 50, date: new Date(2025, 1, 25), status: "Pending", notes: "Awaiting bank confirmation" },
      { id: 3, memberName: "Bob Johnson", type: "Deposit", amount: 200, date: new Date(2025, 1, 24), status: "Completed", notes: "Funds added to balance" },
    ];

    const selectedUser = mockUsers.find(user => user.id === parseInt(id));
    setUser(selectedUser);
    setTransactions(mockTransactions);
  }, [id]);

  const filteredTransactions = selectedDate
    ? transactions.filter((transaction) => isSameDay(transaction.date, selectedDate))
    : transactions;

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
            <Button variant="default" onClick={() => navigate(`/transaction-history/${user.id}`)} className="bg-blue-600 text-white">
              Transaction History
            </Button>
            <Button variant="outline" onClick={() => navigate(`/reward-history/${user.id}`)}>
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
                <div className="bg-gray-1000 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full flex items-center justify-center mb-4">
                  <img src={user.qr} alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <h2 className="text-xl font-bold text-center">{user.name}</h2>
                <p className="text-gray-600 text-center">{user.city}, {user.country}</p>
                <p className="font-semibold text-center">{user.about}</p>
              </div>
            </div>

            {/* Right Side - Transaction History Table */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

              {/* Calendar Popover for Filtering Transactions by Date */}
              <div className="flex items-center mb-4 space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {selectedDate ? format(selectedDate, "PPP") : "Select Transaction Date"}
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

              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead className="text-center">Transaction ID</TableHead>
                    <TableHead className="text-center">Member Name</TableHead>
                    <TableHead className="text-center">Transaction Type</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="cursor-pointer hover:bg-gray-100">
                      <TableCell className="text-center">{transaction.id}</TableCell>
                      <TableCell className="text-center">{transaction.memberName}</TableCell>
                      <TableCell className="text-center">{transaction.type}</TableCell>
                      <TableCell className="text-center">${transaction.amount}</TableCell>
                      <TableCell className="text-center">{format(transaction.date, "PPP")}</TableCell>
                      <TableCell className="text-center">{transaction.status}</TableCell>
                      <TableCell className="text-center">{transaction.notes}</TableCell>
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

export default TransactionHistory;
