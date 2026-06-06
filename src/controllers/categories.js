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
    const catId = Number(req.params.id);
    // const catId=2;
    const categ = await getCategoryById(catId);
    console.log("Response", categ);
    const projByCat = await getProjectsByCategory(categ.category_id);
    const title = categ.category;
    res.render("category", { title, categ, projByCat });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).render("error", { message: "Failed to load category" });
  }
};
