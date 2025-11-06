import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import Modal from "@/components/atoms/Modal";
import EditTaskModal from "@/components/organisms/EditTaskModal";
import TaskCard from "@/components/molecules/TaskCard";
import TaskCounter from "@/components/molecules/TaskCounter";
import DeleteConfirmation from "@/components/molecules/DeleteConfirmation";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import ApperIcon from "@/components/atoms/ApperIcon";
const TaskList = ({ onAddTask }) => {
const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
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

  const handleEditClick = (taskId) => {
    const task = tasks.find(t => t.Id === taskId);
    if (task) {
      setTaskToEdit(task);
      setEditModalOpen(true);
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.Id === updatedTask.Id ? updatedTask : task
      )
    );
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setTaskToEdit(null);
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

// Filter tasks based on active filter
  const filteredTasks = taskService.filterTasks(tasks, activeFilter);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const filteredCompletedTasks = filteredTasks.filter(task => task.completed).length;

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
      <TaskCounter 
        totalTasks={totalTasks} 
        completedTasks={completedTasks}
        filteredTasks={filteredTasks.length}
        filteredCompletedTasks={filteredCompletedTasks}
        activeFilter={activeFilter}
      />

      {/* Filter Buttons */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-card p-4 border border-white/20 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Tasks', icon: 'List' },
            { key: 'active', label: 'Active', icon: 'Circle' },
            { key: 'completed', label: 'Completed', icon: 'CheckCircle' },
            { key: 'due-today', label: 'Due Today', icon: 'Calendar' },
            { key: 'overdue', label: 'Overdue', icon: 'AlertTriangle' },
            { key: 'high-priority', label: 'High Priority', icon: 'Flag' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ApperIcon name={filter.icon} size={16} />
              {filter.label}
              {filter.key !== 'all' && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeFilter === filter.key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {taskService.filterTasks(tasks, filter.key).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.Id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
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

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={editModalOpen}
        onClose={handleEditModalClose}
        task={taskToEdit}
        onTaskUpdated={handleTaskUpdated}
      />
    </>
  );
};

export default TaskList;