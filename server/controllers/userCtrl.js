module.exports = {
  addShippingInfo: (req, res) => {
    const dbInstance = req.app.set("db");

    console.log(req.body);

    const {
      firstname,
      lastname,
      phonenumber,
      email,
      streetaddress,
      extraaddressinfo,
      city,
      state,
      zip
    } = req.body;

    dbInstance.users
      .add_users_shippining_info([
        req.user.userid,
        firstname,
        lastname,
        phonenumber,
        email,
        streetaddress,
        extraaddressinfo,
        city,
        state,
        zip
      ])
      .then(response => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  }
};
