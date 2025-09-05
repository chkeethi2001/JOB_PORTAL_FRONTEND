// src/pages/admin/ManageUsers.jsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns"; 
import API from "../../api/axiosAPI.js";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error loading users:", err);
      toast.error("Failed to load users");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${userId}`);
      toast.success("User deleted");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No users found</p>
      ) : (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Avatar + Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center uppercase shadow-sm text-lg">
                  {user.name?.[0] || "U"}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  {user.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      Registered on: {format(new Date(user.createdAt), "dd MMM yyyy, hh:mm a")}
                    </p>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
