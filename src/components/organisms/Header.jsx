import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <ApperIcon name="CheckSquare" size={24} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          TaskFlow
        </h1>
      </div>
      <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
        Simple, beautiful task management for productive people
      </p>
    </header>
  );
};

export default Header;