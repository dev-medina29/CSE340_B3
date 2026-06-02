export const homePage = async (req, res) => {
  try {
    const title = "Home";
    res.render("home", { title });
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).render("error", { message: "Internal server error" });
  }
};
