import mockTasks from "@/services/mockData/tasks.json";
import { categoryService } from "@/services/api/categoryService";
import React from "react";
import Error from "@/components/ui/Error";
// Simulate localStorage for persistent storage
const STORAGE_KEY = "taskflow_tasks";

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with mock data if no stored data exists
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));
    return [...mockTasks];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [...mockTasks];
  }
};

const setStoredTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(200);
    const tasks = getStoredTasks();
    return tasks.map(task => ({ ...task }));
  },

  async getById(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

async create(taskData) {
    await delay(300);
    const tasks = getStoredTasks();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || "Medium",
      categoryId: taskData.categoryId || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks, newTask];
    setStoredTasks(updatedTasks);
    return { ...newTask };
  },

async update(id, updates) {
    await delay(250);
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      priority: updates.priority || tasks[taskIndex].priority,
      categoryId: updates.categoryId !== undefined ? updates.categoryId : tasks[taskIndex].categoryId,
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    setStoredTasks(updatedTasks);
    
    return { ...updatedTask };
  },

  async getCategoriesWithTasks() {
    try {
      const categories = await categoryService.getAll();
      return categories;
    } catch (error) {
console.error("Error loading categories:", error);
      return [];
    }
  },

  async delete(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
    
    if (filteredTasks.length === tasks.length) {
      throw new Error("Task not found");
    }
    
    setStoredTasks(filteredTasks);
    return true;
  },

  async toggleComplete(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed,
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    setStoredTasks(updatedTasks);
    
return { ...updatedTask };
  },

  // Filter tasks based on criteria
async searchTasks(tasks, searchTerm) {
    if (!searchTerm || !searchTerm.trim()) {
      return [...tasks];
    }
    
    const term = searchTerm.toLowerCase().trim();
    const { categoryService } = await import('./categoryService');
    
    return tasks.filter(task => {
      // Search in title
      const titleMatch = task.title?.toLowerCase().includes(term);
      
      // Search in description  
      const descriptionMatch = task.description?.toLowerCase().includes(term);
      
      // Search in category name (need to resolve category name from ID)
      let categoryMatch = false;
      if (task.categoryId) {
        try {
          const category = categoryService.getById(task.categoryId);
          categoryMatch = category?.name?.toLowerCase().includes(term);
        } catch (error) {
          // Category not found, no match
          categoryMatch = false;
        }
      }
      
      return titleMatch || descriptionMatch || categoryMatch;
    });
  },

  filterTasks(tasks, filterType) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    switch (filterType) {
      case 'all':
        return [...tasks];
      
      case 'active':
        return tasks.filter(task => !task.completed);
      
      case 'completed':
        return tasks.filter(task => task.completed);
      
      case 'due-today':
        return tasks.filter(task => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === today.getTime();
        });
      
      case 'overdue':
        return tasks.filter(task => {
          if (!task.dueDate || task.completed) return false;
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() < today.getTime();
        });
      
      case 'high-priority':
        return tasks.filter(task => task.priority === 'High');
      
      default:
        return [...tasks];
    }
  }
};