import db from "./db.js";

export const getAllProjects = async () => {
  const query =
    "select project_id,organization.name as name, title, ServiceProjects.description, location, date from ServiceProjects join organization on ServiceProjects.organization_id = organization.organization_id;";
  const result = await db.query(query);
  return result.rows;
};
