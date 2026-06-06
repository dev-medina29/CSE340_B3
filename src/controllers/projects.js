import {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
} from "../models/projects.js";
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
