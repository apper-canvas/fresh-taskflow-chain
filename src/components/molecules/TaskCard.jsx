import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
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
          <h3 className={cn(
            "text-lg font-semibold text-gray-900 mb-2 transition-all duration-200",
            task.completed && "task-completed"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={cn(
              "text-gray-600 text-sm leading-relaxed transition-all duration-200",
              task.completed && "task-completed"
            )}>
              {task.description}
            </p>
          )}
          
          {/* Task metadata */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" size={12} />
              <span>
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
            
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
    </motion.div>
  );
};

export default TaskCard;