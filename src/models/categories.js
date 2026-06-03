import db from "./db.js";

export const getAllCategories = async () => {
  const query = "SELECT categories.name as name, category_id FROM categories;";
  const result = await db.query(query);
  return result.rows;
};
// week 3 assignment ** start ***
export const getProjectsByCategory = async (categoryId) => {
  const query = `select ServiceProjects.title as service, categories.name as category
  from project_categories join categories using(category_id) 
  join ServiceProjects using(project_id) where category_id= $1`;
  const category = [categoryId];
  const result = await db.query(query, category);
  return result.rows;
};

export const getCategoryById = async (id) => {
  const query = `select categories.name as category,category_id from categories where category_id=$1`;
  const Id = [id];
  const result = await db.query(query, Id);
  return result.rows[0];
};
export const getCategoriesByProject = async (projectId) => {
  const query = `select ServiceProjects.title as service, categories.name as category, category_id 
  from project_categories join categories using(category_id) 
  join ServiceProjects using(project_id) where project_id= $1`;
  const project = [projectId];
  const result = await db.query(query, project);
  return result.rows;
};

// week 3 assignment ** end ***
