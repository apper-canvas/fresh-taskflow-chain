import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import Modal from "@/components/atoms/Modal";
import TaskForm from "@/components/molecules/TaskForm";

const EditTaskModal = ({ isOpen, onClose, task, onTaskUpdated }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (taskData) => {
    if (!task) return;
    
    setLoading(true);
    try {
      const updatedTask = await taskService.update(task.Id, {
        title: taskData.title,
        description: taskData.description
      });
      
      toast.success("Task updated successfully! ✨");
      onTaskUpdated(updatedTask);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!loading) {
      onClose();
    }
  };

  // Reset loading state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
    }
  }, [isOpen]);

  if (!task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Edit Task"
      closeOnBackdrop={!loading}
      className="max-w-md"
    >
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Edit Task
          </h2>
          <p className="text-sm text-gray-600">
            Make changes to your task details below.
          </p>
        </div>
        
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          initialData={{
            title: task.title || "",
            description: task.description || ""
          }}
          mode="edit"
        />
      </div>
    </Modal>
  );
};

export default EditTaskModal;