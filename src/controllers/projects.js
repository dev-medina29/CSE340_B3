import { body, validationResult } from "express-validator";
import {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject,
  createVolunteer,
  removeVolunteer,
  isAlreadyVolunteer,
} from "../models/projects.js";
import {
  getAllOrganizations,
  getOrganizationDetails,
} from "../models/organizations.js";
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
  let isVolunteer = false;

  if (req.session || req.session.user) {
    isVolunteer = await isAlreadyVolunteer(
      req.session.user.user_id,
      req.params.id,
    );
  }
  console.log("Id", IdValue);
  console.log("User_id", req.session.user.user_id);
  console.log("User info", req.session.user);
  console.log("isVolunteer:", isVolunteer);
  res.render("project", { title, projectDetails, isVolunteer, projById });
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
    .optional()
    .notEmpty()
    .withMessage("Organization is required")
    .isInt()
    .withMessage("Organization must be a valid integer"),
];

export const showEditProjectForm = async (req, res) => {
  const projId = req.params.id;
  const projDet = await getProjectDetails(projId);
  const organizations = await getAllOrganizations();
  const title = "Edit Project";
  res.render("edit-project", { title, projDet, organizations, projId });
};
export const processEditProjectForm = async (req, res) => {
  const projId = req.params.id;
  let orgId = await getProjectDetails(projId);
  orgId = orgId.organization_id;
  console.log(orgId);
  // Check for validation errors
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    // Redirect back to the edit organization form
    return res.redirect("/edit-project/" + req.params.id);
  }
  const { title, description, location, date } = req.body;
  console.log(title, description, location, date, projId, orgId);

  await updateProject(projId, title, description, location, date, orgId);

  // Set a success flash message
  req.flash("success", "Project updated successfully!");

  res.redirect(`/project/${projId}`);
};
export const processVolunteerCreation = async (req, res) => {
  try {
    const project_id = req.params.id;
    const user_id = req.session.user.user_id;
    await createVolunteer(user_id, project_id);
    req.flash("success", "You are now volunteering for this project!");
    res.redirect(`/project/${project_id}`);
  } catch (error) {
    console.error("Error creating volunteer:", error);
    req.flash("error", "An error occurred while signing up for this project.");
    res.redirect(`/project/${req.params.id}`);
  }
};

export const processVolunteerDeletion = async (req, res) => {
  try {
    const project_id = req.params.id;
    const user_id = req.session.user.user_id;
    await removeVolunteer(user_id, project_id);
    req.flash(
      "success",
      "You are now remove from volunteers list of this project!",
    );
    res.redirect(`/project/${project_id}`);
  } catch (error) {
    console.error("Error removing volunteer:", error);
    req.flash(
      "error",
      "An error occurred while removing from volunteer list of this project.",
    );
    res.redirect(`/project/${req.params.id}`);
  }
};
