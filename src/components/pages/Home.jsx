import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import AddTaskModal from "@/components/organisms/AddTaskModal";
import Button from "@/components/atoms/Button";

const Home = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddTask = () => {
    setAddModalOpen(true);
  };

  const handleTaskAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        {/* Task List */}
        <TaskList key={refreshKey} onAddTask={handleAddTask} />

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            variant="fab"
            size="fab"
            icon="Plus"
            onClick={handleAddTask}
            className="shadow-fab hover:shadow-lg"
            aria-label="Add new task"
          />
        </div>

        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={addModalOpen}
          onClose={handleCloseModal}
          onTaskAdded={handleTaskAdded}
        />

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  );
};

export default Home;