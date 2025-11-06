import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-8xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            404
          </div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce-gentle">
              <ApperIcon name="Search" size={32} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Oops! It looks like the page you're looking for doesn't exist. 
            Don't worry, let's get you back to your tasks.
          </p>
        </div>

        {/* Helpful suggestions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <ApperIcon name="Lightbulb" size={16} className="text-indigo-500" />
            What you can do:
          </h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-center gap-2">
              <ApperIcon name="CheckCircle" size={14} className="text-green-500 flex-shrink-0" />
              Go back to your task list
            </li>
            <li className="flex items-center gap-2">
              <ApperIcon name="CheckCircle" size={14} className="text-green-500 flex-shrink-0" />
              Create a new task to stay productive
            </li>
            <li className="flex items-center gap-2">
              <ApperIcon name="CheckCircle" size={14} className="text-green-500 flex-shrink-0" />
              Check your completed tasks
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleGoHome}
            className="w-full"
            icon="Home"
          >
            Back to TaskFlow
          </Button>
          
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center gap-1 mx-auto"
          >
            <ApperIcon name="ArrowLeft" size={14} />
            Or go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;