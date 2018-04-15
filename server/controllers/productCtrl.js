module.exports = {
  getParts: (req, res, next) => {
    const dbInstance = req.app.set("db");

    dbInstance
      .get_parts()
      .then(parts => res.status(200).json(parts))
      .catch(err => {
        console.log(err);
      });
  }
  // getPartByCat: (req, res, next) => {
  //   const dbIntance = req.app.set("db");

  //   dbInstance
  //     .getPartsByCategory()
  //     .then(parts => res.status(200).json(parts))
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};
