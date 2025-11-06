import React, { useState } from "react";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import Modal from "@/components/atoms/Modal";
import TaskForm from "@/components/molecules/TaskForm";

const AddTaskModal = ({ isOpen, onClose, onTaskAdded }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (taskData) => {
setLoading(true);
    try {
      const newTask = await taskService.create(taskData);
      
      onTaskAdded(newTask);
      onClose();
      
      toast.success("Task created successfully! 🎯");
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Add New Task"
      closeOnBackdrop={!loading}
    >
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </Modal>
  );
};

export default AddTaskModal;