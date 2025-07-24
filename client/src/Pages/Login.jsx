/* eslint-disable no-unused-vars */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        { withCredentials: true } 
      );

      toast.success("Login successfully");
      navigate("/todo");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96 space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <Input
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>

        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
