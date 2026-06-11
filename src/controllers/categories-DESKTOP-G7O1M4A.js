import {
  getAllCategories,
  getProjectsByCategory,
  getCategoryById,
  getCategoriesByProject,
} from "../models/categories.js";

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

export const CategoryById = async (req, res) => {
  try {
    const catId = req.params.id;
    const categ = await getCategoryById(catId);
    if (!categ) {
      return res.status(404).render("error", { message: "Category not found" });
    }
    const projByCat = await getProjectsByCategory(categ.category_id);
    const title = categ.category;
    res.render("catego", { title, categ, projByCat });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).render("error", { message: "Failed to load category" });
  }
};
