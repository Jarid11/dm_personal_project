module.exports = {
  getShippingInfo: (req, res) => {
    const dbInstance = req.app.set("db")

    dbInstance.users
      .get_users_shipping_info(req.user.userid)
      .then(user => {
        res.status(200).json(user[0])})
      .catch(err => res.status(500).json(err));

  },
  addShippingInfo: (req, res) => {
    console.log("addShipInfo hit")
    const dbInstance = req.app.set("db");

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
      .add_users_shipping_info([
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
      .then(response => { 
        console.log(response)
        res.status(200).json(response[0])})
      .catch(err => res.status(500).json(err));
  }
};
