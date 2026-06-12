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

export const getUpcomingProjects = async (number_of_projects) => {
  const query = `select project_id,organization.name as name, organization_id, title, ServiceProjects.description, location, date from ServiceProjects join organization using(organization_id) limit $1`;
  const num = [number_of_projects];
  const result = await db.query(query, num);
  return result.rows;
};

export const getProjectDetails = async (id) => {
  const query = `select project_id,title,ServiceProjects.description as des,date,location,organization_id,organization.name as name from ServiceProjects join organization using(organization_id) where project_id=$1 
  `;
  const ID = [id];
  const result = await db.query(query, ID);
  return result.rows[0];
};

export const createProject = async (
  title,
  description,
  location,
  date,
  organizationId,
) => {
  const query = `
      INSERT INTO ServiceProjects (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create project");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Created new project with ID:", result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};
