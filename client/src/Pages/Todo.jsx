import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo/getalltask", {
        withCredentials: true,
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

const handleAddTask = async () => {
  if (!title || !description) return toast.info("Fill all fields");

  try {
    await axios.post(
      "http://localhost:8000/api/v1/todo/addtask",
      { title, description },
      { withCredentials: true }
    );
    setTitle("");
    setDescription("");
    getTasks();
    toast.success("Task added successfully");
  } catch (err) {
    console.error("Error adding task:", err);

    // Check for 401 or unauthorized
    if (err.response?.status === 401 || err.response?.data?.message?.toLowerCase().includes("unauthorized")) {
      toast.warning("Please login to add a task");
    } else {
      toast.error("Failed to add task");
    }
  }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todo/deletetodo/${id}`, {
        withCredentials: true,
      });
      getTasks();
      toast.success("Task deleted sucessfully");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const startEdit = (task) => {
    setEditMode(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/todo/updatetodo/${id}`,
        { title: editTitle, description: editDescription },
        { withCredentials: true }
      );
      setEditMode(null);
      getTasks();
       toast.success("Task edit sucessfuly");
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
const handleLogout = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/user/logout",
      {},
      { withCredentials: true }
    );
    console.log(res.data.message);
    window.location.href = "/login"; 
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed");
  }
};

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">📝 Todo App</h1>
        <Button className="text-black" variant="outline" onClick={handleLogout}>
          Logout 🔓
        </Button>
      </div>

      <div className="flex flex-col items-center space-y-2 mb-6">
        <div className="flex space-x-2 w-full max-w-3xl">
          <Input
            placeholder="Add a new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm"
          />
          <Button onClick={handleAddTask}>Add 🚀</Button>
        </div>
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-3xl bg-zinc-900 text-white p-2 rounded-md border border-gray-700 resize-none text-sm"
          rows={3}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-[#0f172a] border border-gray-700 rounded-lg p-4"
          >
            {editMode === task._id ? (
              <>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mb-2 text-sm"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-zinc-900 text-white p-2 rounded-md border border-gray-600 resize-none mb-2 text-sm"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleUpdate(task._id)}
                  >
                    Save ✅
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditMode(null)}
                  >
                    Cancel ❌
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{task.description}</p>
                <div className="flex justify-end space-x-2 mt-3">
                  <Button size="sm" variant="secondary" onClick={() => startEdit(task)}>
                    Edit ✏️
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(task._id)}>
                    Delete 🗑️
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
