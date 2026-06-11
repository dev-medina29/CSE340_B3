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
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export const getCategoryById = async (id) => {
  const query = `select categories.name as category,category_id from categories where category_id=$1`;
  const result = await db.query(query, [id]);
  return result.rows[0];
};
export const getCategoriesByProject = async (projectId) => {
  const query = `select ServiceProjects.title as service, categories.name as category, category_id 
  from project_categories join categories using(category_id) 
  join ServiceProjects using(project_id) where project_id= $1`;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

// week 3 assignment ** end ***
