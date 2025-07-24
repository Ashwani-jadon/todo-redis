import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TaskImage from "@/assets/vecteezy_icon-hand-with-pencil-put-marks-in-calendar_20716207.png"; // 🧠 Make sure this image exists in src/assets

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center px-6 py-12">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src={TaskImage}
          alt="Task Management Illustration"
          className="max-w-md w-full object-contain rounded-xl "
        />
      </div>

      {/* Text & Button Section */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to TaskSwift ✅
        </h1>
        <p className="text-lg text-gray-300">
          TaskSwift is a modern and secure task management platform built with
          Node.js, Express, MongoDB, and React. You can add, view, update, and
          delete your tasks seamlessly, with full authentication and optimized
          backend performance.
        </p>
        <p className="text-md text-gray-400">
          Built for developers and professionals to manage their daily goals
          with efficiency and simplicity.
        </p>

        <div className="flex space-x-4 pt-4 justify-center md:justify-start">
          <Button onClick={() => navigate("/signup")}>Get Started</Button>
          <Button
            className="text-black"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
