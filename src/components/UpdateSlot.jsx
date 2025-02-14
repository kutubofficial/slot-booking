import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const UpdateSlot = () => {
  const { id } = useParams();
  //   console.log(id); // get id
  const [updatedSlot, setUpdatedSlot] = useState({
    date: "",
    time: "",
  });
  useEffect(() => {
    return () => {
      async function getAPI() {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/client/${id}`
          );
          // console.log(data);// getting single data from local server
          setUpdatedSlot(data);
        } catch (error) {
          console.log("something went wrong!", error);
        }
      }
      getAPI();
    };
  }, [id]);
  const navigate = useNavigate();
  const updatedSlotFinal = async (event) => {
    // console.log(event);
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/client/${id}`, updatedSlot);
      toast.success("slot updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("slot update faild!");
      console.log("ERROR", error);
    }
  };
  return (
    <>
      <div className="min-h-screen p-8 flex flex-col items-center dark:bg-gray-900 dark:text-white bg-gray-50">
        <h1 className="text-3xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Update Slot
        </h1>
        <div className="w-full max-w-72 bg-white dark:bg-gray-800 dark:text-white rounded-4xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col space-y-6 ">
            <input
              type="date"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={updatedSlot.date}
              onChange={(e) =>
                setUpdatedSlot({ ...updatedSlot, date: e.target.value })
              }
            />
            <input
              type="time"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={updatedSlot.time}
              onChange={(e) =>
                setUpdatedSlot({ ...updatedSlot, time: e.target.value })
              }
            />
            <button
              onClick={updatedSlotFinal}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition-all duration-300 shadow-lg `}
            >
              {" "}
              Update Slot
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

export default UpdateSlot;
