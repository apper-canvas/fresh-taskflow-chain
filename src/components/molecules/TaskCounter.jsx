import React from "react";
import ApperIcon from "@/components/ApperIcon";

const TaskCounter = ({ totalTasks, completedTasks }) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-card p-6 border border-white/20 mb-8 hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
            <p className="text-sm text-gray-600">
              {completedTasks} of {totalTasks} completed
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {completionPercentage}%
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Complete
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCounter;