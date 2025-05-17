import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signFailure } from "../Redux/Slice/UserSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "photographer", // optional default role
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData);
      console.log("data :" + res.data )
      dispatch(signInSuccess(res.data));
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.error || "Registration failed.";
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
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>

        <div>
          <Label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            Your Name
          </Label>
          <TextInput
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="w-full"
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Your Email
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
            Your Password
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
          Register
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
