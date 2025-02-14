import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DarkModeToggle from "./DarkModeToggle";

const Booking = () => {
  const [selectedText, setSelectedText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!selectedText || !selectedDate || !selectedTime) {
      toast.error("Please select all fields.");
      return;
    }
    setIsLoading(true);
    try {
      console.log("Selected Date:", selectedDate);
      console.log("Selected Time:", selectedTime);

      const { data } = await axios.get("http://localhost:5000/client");
      console.log("Existing Data:", data);

      const isSlotBooked = data.some(
        (item) => item.date === selectedDate && item.time === selectedTime
      );

      if (isSlotBooked) {
        toast.error(
          "Slot already booked! Please select another date and time."
        );
      } else {
        const response = await axios.post("http://localhost:5000/client", {
          text: selectedText,
          date: selectedDate,
          time: selectedTime,
        });

        if (response.status === 201) {
          toast.success("Slot booked successfully!");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error booking slot:", error);
      toast.error("Failed to book slot. Please try again.");
    }
  };

  return (
    <>
    <div className="min-h-screen p-8 flex flex-col items-center  dark:bg-gray-900 dark:text-white bg-gray-50">
      <h1 className="text-3xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Book a Slot
      </h1>

      <div className="w-full max-w-72 bg-white  dark:bg-gray-800 dark:text-white rounded-4xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col space-y-6 ">
          <input
            type="text"
            placeholder="Enter Full Name"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            required
          />
          <input
            type="date"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input
            type="time"
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
          <button
            onClick={handleBooking}
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition-all duration-300 shadow-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
    <div className="absolute top-5 right-5 ">
    <DarkModeToggle />
  </div>
  </>
  );
};

export default Booking;
