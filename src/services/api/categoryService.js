const mockCategories = [
  { Id: 1, name: "Work", color: "blue", createdAt: "2024-01-10T09:00:00Z" },
  { Id: 2, name: "Personal", color: "purple", createdAt: "2024-01-10T09:00:00Z" },
  { Id: 3, name: "Health", color: "green", createdAt: "2024-01-10T09:00:00Z" },
  { Id: 4, name: "Shopping", color: "orange", createdAt: "2024-01-10T09:00:00Z" },
  { Id: 5, name: "Travel", color: "teal", createdAt: "2024-01-10T09:00:00Z" }
];

const STORAGE_KEY = "taskflow_categories";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredCategories = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with mock data if no stored data exists
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCategories));
    return [...mockCategories];
  } catch (error) {
    console.error("Error reading categories from localStorage:", error);
    return [...mockCategories];
  }
};

const setStoredCategories = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error("Error writing categories to localStorage:", error);
  }
};

export const categoryService = {
  async getAll() {
    await delay(200);
    const categories = getStoredCategories();
    return categories.map(category => ({ ...category }));
  },

  async getById(id) {
    await delay(150);
    const categories = getStoredCategories();
    const category = categories.find(c => c.Id === parseInt(id));
    
    if (!category) {
      throw new Error("Category not found");
    }
    
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const categories = getStoredCategories();
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
    
    const newCategory = {
      Id: maxId + 1,
      name: categoryData.name,
      color: categoryData.color || "gray",
      createdAt: new Date().toISOString()
    };
    
    const updatedCategories = [...categories, newCategory];
    setStoredCategories(updatedCategories);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(250);
    const categories = getStoredCategories();
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id));
    
    if (categoryIndex === -1) {
      throw new Error("Category not found");
    }
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex] = updatedCategory;
    setStoredCategories(updatedCategories);
    
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const categories = getStoredCategories();
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id));
    
    if (categoryIndex === -1) {
      throw new Error("Category not found");
    }
    
    const updatedCategories = categories.filter(c => c.Id !== parseInt(id));
    setStoredCategories(updatedCategories);
    
    return { success: true };
  }
};