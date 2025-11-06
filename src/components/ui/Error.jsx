import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="AlertCircle" size={48} className="text-red-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <ApperIcon name="X" size={16} className="text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">
            {error || "We encountered an unexpected error while loading your tasks."}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <p className="text-sm text-gray-500 mb-3">
            Don't worry, your tasks are safely stored. Try refreshing the page or clicking the retry button below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm text-gray-700 rounded-xl font-medium hover:bg-white/90 transform hover:scale-105 transition-all duration-200 border border-white/20"
          >
            <ApperIcon name="RotateCcw" size={16} />
            Refresh Page
          </button>
        </div>

        <div className="text-xs text-gray-400 pt-4">
          If the problem persists, your browser's developer tools might show more details about the error.
        </div>
      </div>
    </div>
  );
};

export default Error;