import { body, validationResult } from "express-validator";
import {
  getAllCategories,
  getProjectsByCategory,
  getCategoryById,
  getCategoriesByProject,
  getCategoriesByServiceProjectId,
  updateCategoryAssignments,
  createCategory,
  updateCategory,
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

// Category validation rules
export const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
];

// Show new category form
export const showNewCategoryForm = async (req, res) => {
  const title = "Add New Category";
  res.render("new-category", { title });
};

// Process new category form
export const processNewCategoryForm = async (req, res) => {
  // Check for validation errors
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new category form
    return res.redirect("/new-category");
  }

  const { name } = req.body;

  try {
    const categoryId = await createCategory(name);
    req.flash("success", "Category added successfully!");
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error("Error creating category:", error);
    req.flash("error", "There was an error creating the category.");
    res.redirect("/new-category");
  }
};

// Show edit category form
export const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const title = "Edit Category";
  res.render("edit-category", { title, category });
};

// Process edit category form
export const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  // Check for validation errors
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the edit category form
    return res.redirect("/edit-category/" + req.params.id);
  }

  const { name } = req.body;

  try {
    await updateCategory(categoryId, name);
    req.flash("success", "Category updated successfully!");
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error("Error updating category:", error);
    req.flash("error", "There was an error updating the category.");
    res.redirect("/edit-category/" + categoryId);
  }
};
