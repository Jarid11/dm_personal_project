let products = [];
module.exports = {
  getParts: (req, res, next) => {
    const dbInstance = req.app.set("db");
    if (!products.length) {
      dbInstance
        .get_parts()
        .then(parts => {
          products = parts;
          res.status(200).json(products);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      res.status(200).json(products);
    }
  }
};
