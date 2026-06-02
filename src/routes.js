import express from "express";
import { showOrganizationDetailsPage } from "./controllers/organizations.js";
import { organizationsPage } from "./controllers/organizations.js";
import { categoriesPage } from "./controllers/categories.js";
import { projectsPage } from "./controllers/projects.js";
import { homePage } from "./controllers/index.js";
import { errorsPage } from "./controllers/errors.js";

const router = express.Router();

router.get("/projects", projectsPage);
router.get("/organizations", organizationsPage);
router.get("/categories", categoriesPage);
router.get("/", homePage);
router.get("/organization/:id", showOrganizationDetailsPage);
// error handler
router.get("/test-error", errorsPage);

export default router;
