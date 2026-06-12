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
} from "./controllers/categories.js";
import {
  projectsPage,
  showProjectDetailsPage,
  processNewProjectForm,
  showNewProjectForm,
} from "./controllers/projects.js";
import { homePage } from "./controllers/index.js";
import { errorsPage } from "./controllers/errors.js";

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

// Route for new organization page
router.get("/new-organization", showNewOrganizationForm);

// Route to handle new organization form submission
router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm,
);
router.get("/edit-organization/:id", showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post(
  "/edit-organization/:id",
  organizationValidation,
  processEditOrganizationForm,
);

// Route for new project page
router.get("/new-project", showNewProjectForm);

// Route to handle new project form submission
router.post("/new-project", processNewProjectForm);

// Routes to handle the assign categories to project form
router.get("/assign-categories/:projectId", showAssignCategoriesForm);
router.post("/assign-categories/:projectId", processAssignCategoriesForm);

export default router;
