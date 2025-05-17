import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInStart, signInSuccess, signFailure } from "../Redux/Slice/UserSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData);
      dispatch(signInSuccess(res.data)); // Save user into redux
      localStorage.setItem("token", res.data.access_token);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to homepage or dashboard
    } catch (err) {
      console.error("Login error:", err);
      const message = err.response?.data?.error || "Login failed.";
      dispatch(signFailure(message));
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Login to Your Account
        </h2>

        <div>
          <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <TextInput
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full"
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </Label>
          <TextInput
            id="password"
            type="password"
            placeholder="********"
            required
            className="w-full"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </Label>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
