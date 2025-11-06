import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onAddTask }) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-sm mx-auto space-y-6">
        {/* Illustration */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CheckSquare" size={64} className="text-indigo-400" />
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center animate-bounce-gentle">
            <ApperIcon name="Plus" size={16} className="text-white" />
          </div>
          
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
            <ApperIcon name="Sparkles" size={12} className="text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to get organized?
          </h2>
          <p className="text-gray-600">
            You haven't added any tasks yet. Start by creating your first task to begin staying productive!
          </p>
        </div>

        {/* Motivational tip */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <ApperIcon name="Lightbulb" size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 mb-1">Pro Tip</p>
              <p className="text-xs text-gray-600">
                Start with small, achievable tasks to build momentum and create a productive routine.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <button
          onClick={onAddTask}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <ApperIcon name="Plus" size={20} />
          Add Your First Task
        </button>

        {/* Arrow pointing to FAB */}
        <div className="flex items-center justify-end pt-8">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm">Or click the</span>
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Plus" size={12} className="text-white" />
            </div>
            <span className="text-sm">button</span>
            <ApperIcon name="ArrowDown" size={16} className="animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;