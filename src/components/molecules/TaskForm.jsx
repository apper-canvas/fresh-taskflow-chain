import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";

const TaskForm = ({ onSubmit, onCancel, loading = false, initialData = {}, mode = "create" }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    } else if (title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    
    if (description.trim().length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
try {
      await onSubmit({
        title: title.trim(),
        description: description.trim()
      });
      
      // Reset form only in create mode
      if (mode === "create") {
        setTitle("");
        setDescription("");
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors({ ...errors, title: "" });
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors({ ...errors, description: "" });
    }
  };

  const isFormValid = title.trim().length >= 2 && title.trim().length <= 100 && description.trim().length <= 500;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Task Title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your task title..."
          required
          error={errors.title}
          maxLength={100}
          disabled={loading}
        />
      </div>
      
      <div>
        <TextArea
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Add more details about your task (optional)..."
          rows={4}
          error={errors.description}
          maxLength={500}
          disabled={loading}
        />
        <div className="text-xs text-gray-500 mt-1">
          {description.length}/500 characters
        </div>
      </div>
      
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
disabled={!isFormValid || loading}
          loading={loading}
          className="flex-1"
        >
          {loading ? (mode === "edit" ? "Updating..." : "Creating...") : (mode === "edit" ? "Update Task" : "Create Task")}
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;