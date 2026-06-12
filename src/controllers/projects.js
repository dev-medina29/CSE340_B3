import { body, validationResult } from "express-validator";
import {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
} from "../models/projects.js";
import { getAllOrganizations } from "../models/organizations.js";
import { getCategoriesByProject } from "../models/categories.js";
export const projectsPage = async (req, res) => {
  try {
    const projects = await getAllProjects();
    const NUMBER_OF_UPCOMING_PROJECTS = 5;
    const fiveProj = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    console.log("5pro:", fiveProj);
    console.log("Projects:", projects);
    const title = "Upcoming Service Projects";
    res.render("projects", { title, fiveProj });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).render("error", { message: "Failed to load projects" });
  }
};

export const showProjectDetailsPage = async (req, res) => {
  // const title = "Medina tries";
  const IdValue = req.params.id;
  const projById = await getCategoriesByProject(IdValue);
  const projectDetails = await getProjectDetails(IdValue);
  console.log("See this", projectDetails);
  const title = projectDetails.title;
  res.render("project", { title, projectDetails, projById });
};

export const showNewProjectForm = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = "Add New Service Project";

  res.render("new-project", { title, organizations });
};

export const processNewProjectForm = async (req, res) => {
  // Extract form data from req.body
  const { title, description, location, date, organizationId } = req.body;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Loop through validation errors and flash them
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new project form
    return res.redirect("/new-project");
  }
  try {
    // Create the new project in the database
    const newProjectId = await createProject(
      title,
      description,
      location,
      date,
      organizationId,
    );

    req.flash("success", "New service project created successfully!");
    res.redirect(`/project/${newProjectId}`);
  } catch (error) {
    console.error("Error creating new project:", error);
    req.flash("error", "There was an error creating the service project.");
    res.redirect("/new-project");
  }
};

export const projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 200 })
    .withMessage("Location must be less than 200 characters"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid date format"),
  body("organizationId")
    .notEmpty()
    .withMessage("Organization is required")
    .isInt()
    .withMessage("Organization must be a valid integer"),
];
