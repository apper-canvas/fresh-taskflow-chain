import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await onToggleComplete(task.Id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = () => {
    onDelete(task.Id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
className={cn(
        "bg-white/70 backdrop-blur-sm rounded-2xl shadow-card p-6 border border-white/20",
        "hover:shadow-card-hover hover:scale-[1.01] transition-all duration-200",
        task.completed && "opacity-75"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <button
            onClick={handleToggleComplete}
            disabled={isUpdating}
            className="task-checkbox focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:opacity-50"
            style={{
              backgroundColor: task.completed ? '#10b981' : 'white',
              borderColor: task.completed ? '#10b981' : '#d1d5db'
            }}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="text-white"
              >
                <ApperIcon name="Check" size={12} />
              </motion.div>
            )}
          </button>
        </div>
        
        {/* Content */}
<div className="flex-1 min-w-0">
          <div className="group cursor-pointer" onClick={() => onEdit?.(task.Id)}>
            <h3 className={cn(
              "text-lg font-semibold text-gray-900 mb-2 transition-all duration-200",
              "group-hover:text-indigo-600",
              task.completed && "task-completed"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "text-gray-600 text-sm leading-relaxed transition-all duration-200",
                "group-hover:text-gray-700",
                task.completed && "task-completed"
              )}>
                {task.description}
              </p>
            )}
</div>
{/* Priority badge */}
          <div className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
            task.priority === "High" && "bg-red-100 text-red-800 border border-red-200",
            task.priority === "Medium" && "bg-orange-100 text-orange-800 border border-orange-200",
            task.priority === "Low" && "bg-green-100 text-green-800 border border-green-200"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              task.priority === "High" && "bg-red-500",
              task.priority === "Medium" && "bg-orange-500",
              task.priority === "Low" && "bg-green-500"
            )} />
            {task.priority}
          </div>
          
          {/* Task metadata */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" size={12} />
              <span>
                Created {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {task.dueDate && (
              <div className={`flex items-center gap-1 ${
                new Date(task.dueDate) < new Date() && !task.completed
                  ? "text-red-600 font-medium"
                  : "text-blue-600"
              }`}>
                <ApperIcon name="Clock" size={12} />
                <span>
                  Due {new Date(task.dueDate).toLocaleDateString()}
                  {new Date(task.dueDate) < new Date() && !task.completed && " (Overdue)"}
                </span>
              </div>
            )}
            
            {task.completed && (
              <div className="flex items-center gap-1 text-green-600">
                <ApperIcon name="CheckCircle" size={12} />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Delete button */}
        <div className="flex-shrink-0">
<div className="flex gap-1">
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                icon="Edit3"
                onClick={() => onEdit?.(task.Id)}
                className="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 p-2"
                aria-label="Edit task"
              />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                aria-label="Delete task"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;