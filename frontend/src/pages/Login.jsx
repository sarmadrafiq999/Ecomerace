import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentstate, setCurrentState] = useState("Sing Up");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const resetFields = (keepEmailAndPassword = false) => {
    setName("");
    if (!keepEmailAndPassword) {
      setEmail("");
      setPassword("");
    }
  };

  const onSubbmitHnadler = async (e) => {
    e.preventDefault();
    try {
      if (currentstate === "Sing Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.token) {
          toast.success("Registered successfully!");
          setCurrentState("Login"); // Switch to login
          resetFields(true); // Clear name, keep email & password for login
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message || "Login successful!");
          resetFields(); // Clear all
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubbmitHnadler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl"> {currentstate} </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentstate !== "Login" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentstate === "Login" ? (
          <p
            onClick={() => {
              resetFields(); // clear everything
              setCurrentState("Sing Up");
            }}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => {
              setCurrentState("Login");
            }}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentstate === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
