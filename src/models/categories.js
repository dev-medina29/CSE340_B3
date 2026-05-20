import db from "./db.js";

export const getAllCategories = async () => {
  const query = "SELECT categories.name as name FROM categories;";
  const result = await db.query(query);
  return result.rows;
};
