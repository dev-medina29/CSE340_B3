import { getAllProjects } from "../models/projects.js";
export const projectsPage = async (req, res) => {
  try {
    const projects = await getAllProjects();
    console.log("Projects:", projects);
    const title = "Service Projects";
    res.render("projects", { title, projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).render("error", { message: "Failed to load projects" });
  }
};

