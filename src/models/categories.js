import db from "./db.js";

export const getAllCategories = async () => {
  const query = "SELECT categories.name as name, category_id FROM categories;";
  const result = await db.query(query);
  return result.rows;
};
// week 3 assignment ** start ***
export const getProjectsByCategory = async (categoryId) => {
  const query = `select ServiceProjects.title as service, project_id as id, categories.name as category
  from project_categories join categories using(category_id) 
  join ServiceProjects using(project_id) where category_id= $1`;
  const category = [categoryId];
  const result = await db.query(query, category);
  return result.rows;
};

export const getCategoryById = async (id) => {
  const query = `select categories.name as category,category_id from categories where category_id=$1`;
  const params = [id];
  console.error(params);
  console.error(query);
  const result = await db.query(query, params);
  console.log("The result of getCategoryById function", result);
  return result.rows[0];
};
export const getCategoriesByProject = async (projectId) => {
  const query = `select ServiceProjects.title as service, categories.name as category, category_id 
  from project_categories join categories using(category_id) 
  join ServiceProjects using(project_id) where project_id= $1`;
  const params = [projectId];
  const result = await db.query(query, params);
  return result.rows;
};

// week 3 assignment ** end ***

// week 4 activity

export const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
};

export const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};

export const getCategoriesByServiceProjectId = async (projectId) => {
  const query = `select categories.category_id, categories.name as category
  from project_categories join categories using(category_id)
  where project_id = $1`;
  const params = [projectId];
  const result = await db.query(query, params);
  return result.rows;
};

// week 4 activity **end**
