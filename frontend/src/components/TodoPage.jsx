// TodoPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../store/todoSlice";
import { toast } from "react-toastify";

const TodoPage = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { tasks, status } = useSelector((state) => state.todos);

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user && token) {
      console.log("Dispatching fetchTasks with token:", token);
      dispatch(fetchTasks(token)); // Fetch tasks only when user is authenticated
    }
  }, [dispatch, user, token]); // Ensure tasks are fetched only when token or user changes

  const handleCreateTask = () => {
    if (!task.trim()) return;

    console.log("Creating task:", task, description);
    dispatch(createTask({ title: task, description, token }))
      .then(() => {
        toast.success(`Task Created: ${task}`);
        setTask("");
        setDescription("");
      })
      .catch(() => {
        toast.error("Failed to create task.");
      });
  };

  const handleUpdateTask = () => {
    if (!editingTask || !task.trim()) return;

    console.log("Updating task:", editingTask, task, description);
    dispatch(
      updateTask({
        id: editingTask._id,
        title: task,
        description,
        completed: false,
        token,
      })
    )
      .then(() => {
        toast.success(`Task Updated: ${task}`);
        setTask("");
        setDescription("");
        setEditingTask(null);
      })
      .catch(() => {
        toast.error("Failed to update task.");
      });
  };

  const handleDeleteTask = (taskId) => {
    console.log("Deleting task with ID:", taskId);
    dispatch(deleteTask({ id: taskId, token }))
      .then(() => {
        toast.success("Task Deleted");
      })
      .catch(() => {
        toast.error("Failed to delete task.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 bg-gray-800 rounded-xl mt-6 shadow-md">
      <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-600 pb-2">
        📝 {editingTask ? "Edit Task" : "Create a Task"}
      </h2>

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task title"
          className="px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={editingTask ? handleUpdateTask : handleCreateTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingTask ? "Update Task" : "Create Task"}
        </button>
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">📋 Tasks</h3>
      <ul className="bg-gray-700 rounded-md divide-y divide-gray-600">
        {tasks && tasks.length > 0 ? (
          tasks.map((t) => (
            <li
              key={t._id}
              className="px-4 py-2 text-white flex justify-between flex-col sm:flex-row sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-bold">{t.title}</p>
                <p className="text-sm text-gray-300">{t.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingTask(t);
                    setTask(t.title);
                    setDescription(t.description || "");
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(t._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-white px-4 py-2">No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default TodoPage;
