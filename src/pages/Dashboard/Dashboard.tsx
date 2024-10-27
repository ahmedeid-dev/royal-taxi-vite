import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";
import { useState } from "react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  // console.log("dashboard current user", currentUser?.email)

  const [error, setError] = useState("");
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError(error.message || "Failed to log out");
    }
  }
  // console.log(currentUser)
  return (
    <div className="flex justify-center  items-center min-h-screen">
      <div className="flex flex-col items-center gap-10 w-full justify-between bg-[#0D2D56] text-white p-10 max-w-md rounded-l-md">
        <h1 className="text-4xl font-semibold text-gray-400">Profile</h1>
        {error && <p className="text-red-500">{error}</p>}
        <strong className="text-center text-lg leading-relaxed">
          Email: {currentUser && <span className="text-white">{currentUser.email} </span>}
        </strong>
        <div className="flex flex-row justify-between items-center w-full gap-3 text-center">
          <Link to='/update-profile' className="bg-[#2A73D3] hover:bg-[#09c] w-full rounded p-3 mt-4 transition"> Update Profile</Link>
          <button onClick={() => handleLogout()} className="bg-red-500 hover:bg-red-700 rounded p-3 mt-4 transition w-full">Logout</button>
        </div>
      </div>
    </div>
  );
}
