import {
  getAllCategories,
  getProjectsByCategory,
  getCategoryById,
  getCategoriesByProject,
  getCategoriesByServiceProjectId,
  updateCategoryAssignments,
} from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";

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

// week 4 activity
export const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByServiceProjectId(projectId);

  const title = "Assign Categories to Project";

  res.render("assign-categories", {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories,
  });
};

export const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];

  // Ensure selectedCategoryIds is an array
  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash("success", "Categories updated successfully.");
  res.redirect(`/project/${projectId}`);
};

// week 4 activity ** end **
