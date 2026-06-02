import {
  getAllOrganizations,
  getOrganizationDetails,
} from "../models/organizations.js";
import { getProjectsByOrganizationId } from "../models/projects.js";

export const organizationsPage = async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    console.log("Organizations:", organizations);
    const title = "Our Partner Organizations";
    res.render("organizations", { title, organizations });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res
      .status(500)
      .render("error", { message: "Failed to load organizations" });
  }
};

export const showOrganizationDetailsPage = async (req, res) => {
  const organizationId = req.params.id;
  const organizationDetails = await getOrganizationDetails(organizationId);
  const projects = await getProjectsByOrganizationId(organizationId);
  const title = "Organization Details";
  res.render("organization", { title, organizationDetails, projects });
};
