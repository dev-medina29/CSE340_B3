import express from "express";
import { showOrganizationDetailsPage } from "./controllers/organizations.js";
import {
  organizationsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm,
} from "./controllers/organizations.js";
import {
  categoriesPage,
  CategoryById,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
} from "./controllers/categories.js";
import {
  projectsPage,
  showProjectDetailsPage,
  processNewProjectForm,
  showNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation,
  processVolunteerCreation,
  processVolunteerDeletion,
} from "./controllers/projects.js";
import { homePage } from "./controllers/index.js";
import { errorsPage } from "./controllers/errors.js";
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  processLogout,
  processLoginForm,
  showLoginForm,
  requireLogin,
  showDashboard,
  requireRole,
  showAllUsers,
} from "./controllers/users.js";
import { createVolunteer } from "./models/projects.js";
const router = express.Router();

router.get("/projects", projectsPage);
router.get("/project/:id", showProjectDetailsPage);
router.get("/organizations", organizationsPage);
router.get("/categories", categoriesPage);
router.get("/", homePage);
router.get("/organization/:id", showOrganizationDetailsPage);
// error handler
router.get("/test-error", errorsPage);

router.get("/category/:id", CategoryById);

// Routes for new category page
router.get("/new-category", requireRole("admin"), showNewCategoryForm);
router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidation,
  processNewCategoryForm,
);

// Routes for edit category page
router.get("/edit-category/:id", requireRole("admin"), showEditCategoryForm);
router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryValidation,
  processEditCategoryForm,
);

// Route for new organization page
router.get("/new-organization", requireRole("admin"), showNewOrganizationForm);

// Route to handle new organization form submission
router.post(
  "/new-organization",
  requireRole("admin"),
  organizationValidation,
  processNewOrganizationForm,
);
router.get(
  "/edit-organization/:id",
  requireRole("admin"),
  showEditOrganizationForm,
);
// Route to handle the edit organization form submission
router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationValidation,
  processEditOrganizationForm,
);

// Route for new project page
router.get("/new-project", requireRole("admin"), showNewProjectForm);

// Route to handle new project form submission
router.post("/new-project", requireRole("admin"), processNewProjectForm);

// Routes to handle the assign categories to project form
router.get(
  "/assign-categories/:projectId",
  requireRole("admin"),
  showAssignCategoriesForm,
);
router.post(
  "/assign-categories/:projectId",
  requireRole("admin"),
  processAssignCategoriesForm,
);

router.get("/edit-project/:id", requireRole("admin"), showEditProjectForm);
// router.post("/edit-project/:id", projectValidation, processEditProjectForm);
router.post("/edit-project/:id", requireRole("admin"), processEditProjectForm);

// User registration routes
router.get("/register", showUserRegistrationForm);
router.post("/register", processUserRegistrationForm);

// User login routes
router.get("/login", showLoginForm);
router.post("/login", processLoginForm);
router.get("/logout", processLogout);

// Protected dashboard route
router.get("/dashboard", requireLogin, showDashboard);

// Protected user management route
router.get("/users", requireRole("admin"), showAllUsers);

// Final feature
router.get("/project/:id/volunteer", requireLogin, processVolunteerCreation);
router.get("/project/:id/unvolunteer", requireLogin, processVolunteerDeletion);

export default router;
