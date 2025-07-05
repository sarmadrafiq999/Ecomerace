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
  const [rememberMe, setRememberMe] = useState(false);

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
          setCurrentState("Login");
          resetFields(true);
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
          if (rememberMe) {
            localStorage.setItem("token", response.data.token);
          } else {
            sessionStorage.setItem("token", response.data.token);
          }
          toast.success(response.data.message || "Login successful!");
          resetFields();
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
        <p className="prata-regular text-3xl">{currentstate}</p>
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

      {currentstate === "Login" && (
        <div className="w-full flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="cursor-pointer"
            />
            Remember Me
          </label>

          <p
            className="cursor-pointer hover:text-orange-600"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot your password?
          </p>
        </div>
      )}

      <div className="w-full flex justify-end text-sm">
        {currentstate === "Login" ? (
          <p
            onClick={() => {
              resetFields();
              setCurrentState("Sing Up");
            }}
            className="cursor-pointer hover:text-orange-600"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => {
              setCurrentState("Login");
            }}
            className="cursor-pointer hover:text-orange-600"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 my-4 cursor-pointer">
        {currentstate === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
