import { getAllCategories } from "../models/categories.js";
export const categoriesPage = async (req, res) => {
  try {
    const title = "Categories of Service";
    const categories = await getAllCategories();
    res.render("categories", { title, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).render("error", { message: "Failed to load categories" });
  }
};
