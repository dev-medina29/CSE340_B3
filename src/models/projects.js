import db from "./db.js";

export const getAllProjects = async () => {
  const query =
    "select project_id,organization.name as name, title, ServiceProjects.description, location, date from ServiceProjects join organization on ServiceProjects.organization_id = organization.organization_id;";
  const result = await db.query(query);
  return result.rows;
};

export const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM ServiceProjects
        WHERE organization_id = $1
        ORDER BY date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

export const getUpcomingProjects= async (number_of_projects)=>{


};
