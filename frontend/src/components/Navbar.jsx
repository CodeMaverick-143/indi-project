import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="font-bold text-2xl hover:text-blue-100 transition">
              💬 Threaded Comments
            </h1>
          </Link>
          
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <span className="text-blue-100">
                  Welcome, <span className="font-semibold">{user?.username || "User"}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg font-medium transition shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
