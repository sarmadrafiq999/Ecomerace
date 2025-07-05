import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password/${token}`, {
        newPassword,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Reset link expired or invalid.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border p-3 rounded mb-3"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Set New Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
    