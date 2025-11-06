import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import TaskCard from "@/components/molecules/TaskCard";
import TaskCounter from "@/components/molecules/TaskCounter";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Modal from "@/components/atoms/Modal";
import DeleteConfirmation from "@/components/molecules/DeleteConfirmation";

const TaskList = ({ onAddTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const taskData = await taskService.getAll();
      setTasks(taskData);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.Id === taskId ? updatedTask : task
        )
      );

      toast.success(
        updatedTask.completed 
          ? "Task completed! Great job! 🎉" 
          : "Task marked as incomplete"
      );
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteClick = (taskId) => {
    const task = tasks.find(t => t.Id === taskId);
    if (task) {
      setTaskToDelete(task);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;

    setDeleteLoading(true);
    try {
      await taskService.delete(taskToDelete.Id);
      
      setTasks(prevTasks =>
        prevTasks.filter(task => task.Id !== taskToDelete.Id)
      );
      
      toast.success("Task deleted successfully");
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteLoading) {
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} onRetry={loadTasks} />;
  }

  if (tasks.length === 0) {
    return <Empty onAddTask={onAddTask} />;
  }

  return (
    <>
      {/* Task Counter */}
      <TaskCounter totalTasks={totalTasks} completedTasks={completedTasks} />

      {/* Task List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard
              key={task.Id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteClick}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        title=""
        showCloseButton={false}
        closeOnBackdrop={!deleteLoading}
      >
        <DeleteConfirmation
          taskTitle={taskToDelete?.title || ""}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleteLoading}
        />
      </Modal>
    </>
  );
};

export default TaskList;