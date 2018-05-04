module.exports = {
  getParts: (req, res, next) => {
    const dbInstance = req.app.set("db");

    // if (!products.length) {
    // prevents admin name change to show instantly
    // but now I have to hit my db many times..

    dbInstance.parts
      .get_parts()
      .then(parts => {
        res.status(200).json(parts);
      })
      .catch(err => {
        console.log(err);
      });

    // } else {
    //   res.status(200).json(products);
    // }
  },
  getPartCategories: (req, res, next) => {
    const dbInstance = req.app.set("db");

    dbInstance
      .parts
      .get_part_categories()
      .then(parts => res.status(200).json(parts))
      .catch(err => console.log(err))
  }
};
