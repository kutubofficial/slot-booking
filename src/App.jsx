import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Booking from "./components/Booking";
import { Toaster } from "react-hot-toast";
import UpdateSlot from "./components/UpdateSlot";
import Profile from "./components/pages/Profile";

const App = () => {
  return (
    
      <Router>
        <div className="p-4 dark:bg-gray-900 dark:text-white bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/update/:id" element={<UpdateSlot />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
          
        </div>
        <Toaster />
      </Router>
  );
};

export default App;
