import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DarkModeToggle from "./DarkModeToggle";

const Dashboard = () => {
  const [slots, setSlots] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:5000/client");
      setSlots(data);
    }
    fetchData();
  }, [toggle]);

  const navigate = useNavigate();
  //for delete slot
  async function deleteSlot(id) {
    try {
      await axios.delete(`http://localhost:5000/client/${id}`);
      toast.success("slot deleted");
      setToggle(!toggle);
    } catch (error) {
      toast.error("unable to delete");
    }
  }
  return (
    <>
      <div className="min-h-screen p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <div className="mb-8">
          <Link
            to="/booking"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg transition-all duration-300 shadow-lg"
          >
            Book a Slot
          </Link>
        </div>
        <ul className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {slots?.map((ele, index) => (
            <li
              key={ele.id}
              onClick={() => navigate(`/profile/${ele.id}`)}
              className="bg-white dark:bg-gray-700 dark:text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                {/* <h1 className="text-xl font-semibold text-gray-800">
                {ele.text}
              </h1> */}
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {ele.time}
                </h2>
                <p className="text-gray-600 dark:text-white">{ele.date}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/update/${ele.id}`); //for update slot
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition-colors duration-300 text-sm font-medium"
                  >
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlot(ele.id); // for delete slot
                    }}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full transition-colors duration-300 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-5 right-5 ">
        <DarkModeToggle />
      </div>
    </>
  );
};

export default Dashboard;
