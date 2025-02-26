import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./app/dashboard/Dashboard"
import TotalMembers from "./components/TotalMembers";
import Profile from "./components/Profile";
import ReferredUser from "./components/ReferredUser";
import TransactionHistory from "./components/TransactionHistory";
import RewardHistory from "./components/RewardHistory";
import ConversionHistory from "./components/ConversionHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Totalmembers" element={<TotalMembers />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/referred-users/:id" element={<ReferredUser />} />
        <Route path="/transaction-history/:id" element={<TransactionHistory />} />
        <Route path="/reward-history/:id" element={<RewardHistory />} />
        <Route path="/conversion-history/:id" element={<ConversionHistory />} />
      </Routes>
    </Router>
  )
}

export default App;
