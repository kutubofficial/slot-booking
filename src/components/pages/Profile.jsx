import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";

const Profile = () => {
  const { id } = useParams();
  // console.log("GET ID", id);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:5000/client/${id}`);
      console.log(data);
      setProfileData(data);
    }
    fetchData();
  }, [navigate]);

  console.log("profileData", profileData);

  return (
    <>
      <div className="min-h-screen p-8 flex flex-col items-center dark:bg-gray-900 dark:text-white bg-gray-50">
        <h1 className="text-3xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Client Profile
        </h1>
        <div className="w-full max-w-96 bg-white rounded-4xl dark:bg-gray-800 dark:text-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col space-y-6">
            <p className="text-lg">
              <span className="font-semibold rou ">Full Name:</span>{" "}
              {profileData?.text || "N/A"}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Slot Date & Time:</span>{" "}
              {profileData?.date && profileData?.time
                ? `${profileData?.date} ${profileData?.time}`
                : "Not defined"}
            </p>
            <button
              onClick={() => navigate(`/update/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg transition-all duration-300 shadow-lg"
            >
              Change Slot Time
            </button>
            <button
              onClick={() => navigate(`/`)}
              className=" px-6 py-2 text-lg"
            >
              <u>Go to Dashboard</u>
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

export default Profile;
