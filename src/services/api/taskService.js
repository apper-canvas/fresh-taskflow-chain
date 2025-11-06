import mockTasks from "@/services/mockData/tasks.json";

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
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    setStoredTasks(updatedTasks);
    
    return { ...updatedTask };
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
  }
};