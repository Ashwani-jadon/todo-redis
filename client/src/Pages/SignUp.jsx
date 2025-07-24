import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  // Step 1: Set up state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Step 2: Handle form submit
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/signup", formData); 
      if (res.data.success) {
        toast.success("signup completed sucessfully");
        navigate("/login");
      } else {
        toast.info(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.warn("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96 space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <Input
          placeholder="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button className="w-full" onClick={handleSubmit}>
          Create Account
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
