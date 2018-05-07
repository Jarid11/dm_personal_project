module.exports = {
  getCart: (req, res) => {
    const dbInstance = req.app.set("db");

    if(!req.user) {
        res.status(200).json("Must Login To See Cart");
    } else {
      dbInstance.cart
      .get_cart(req.user.userid)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
    }
  },
  getTotalItems: (req, res) => {
    const dbInstance = req.app.set("db");

    dbInstance.cart
      .get_cart_item_total(req.user.userid)
      .then(([response]) => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  },
  getGrandTotal: (req, res) => {
    const dbInstance = req.app.set("db");

    dbInstance.cart
      .get_cart_grandTotal(req.user.userid)
      .then(([response]) => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  },
  getCartImgs: (req, res) => {
    const dbInstance = req.app.set("db");

    dbInstance.cart
      .get_cart_imgs(req.user.userid)
      .then(response => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  },
  addToCart: (req, res) => {
    const dbInstance = req.app.set("db");

    console.log(req.user)

    dbInstance.cart
      .add_to_cart([req.user.userid, req.body.id, parseInt(req.body.qty)])
      .then(response => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  },
  updateCart: (req, res) => {
    const dbInstance = req.app.set("db");

    console.log(req.user)

    dbInstance.cart
      .update_cart([req.user.userid, req.body.id, req.body.qty])
      .then(response => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  },
  deleteFromCart: (req, res) => {
    const dbInstance = req.app.set("db");

    console.log(req.user)

    dbInstance.cart
      .delete_from_cart([req.user.userid, req.params.id])
      .then(response => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  },
  emptyCart: (req, res) => {
    const dbInstance = req.app.set("db");

    dbInstance.cart
      .empty_cart([req.user.userid])
      .then(response => res.status(200).json(response))
      .catch(err => res.status(500).json(err));
  }
};
