import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const DeleteConfirmation = ({ taskTitle, onConfirm, onCancel, loading = false }) => {
  return (
    <div className="space-y-6">
      {/* Warning icon */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" size={32} className="text-red-500" />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="text-center space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Delete Task
        </h3>
        <p className="text-gray-600">
          Are you sure you want to delete "{taskTitle}"? This action cannot be undone.
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={loading}
          loading={loading}
          className="flex-1"
        >
          {loading ? "Deleting..." : "Delete Task"}
        </Button>
        
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;