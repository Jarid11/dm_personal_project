import React, { Component } from "react";
import "./Product.css";

import Header from "../Header/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getParts } from "../../ducks/partReducer";
import { addToCart, getCart, updateCart } from "../../ducks/cartReducer";

class Product extends Component {
  constructor(props) {
    super();
    this.state = {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selected: 1
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.props.getParts();
    this.props.getCart();
  }

  addToCart(id, qty) {
    if (!this.props.user.name) return alert("Login to add to Cart");
    if (!this.props.cart.length) {
      return this.handleAdd(id, qty);
    } else {
      for (let i = 0; i < this.props.cart.length; i++) {
        if (this.props.cart[i].part_id === id) {
          let newQty = parseInt(this.props.cart[i].quantity) + parseInt(qty);
          return this.handleUpdate(id, newQty);
        }
      }
      this.handleAdd(id, qty);
    }
  }

  qtySelectVal(val) {
    this.setState({
      selected: val
    });
  }

  handleUpdate(id, selected) {
    this.props
      .updateCart(id, parseInt(selected))
      .then(() => this.props.getCart());
  }

  handleAdd(id, qty) {
    this.props.addToCart(id, qty).then(() => this.props.getCart());
  }

  render() {
    const { parts } = this.props;
    const partList = parts
      .filter(
        e =>
          this.props.location.pathname === "/product"
            ? e.specials === 1
            : e.category === this.props.match.params.type
      )
      .map((e, i) => {
        return (
          <div className="productContainer" key={i}>
            <h3 className="productName">{e.name}</h3>
            <h5 className="productNum">Part Number: {e.model}</h5>
            <img className="productImg" src={e.img} alt="part" />
            <h3>${e.price}</h3>
            <div>
              <select
                onChange={e => this.qtySelectVal(e.target.value)}
                value={this.state.selected}
                id="qtySelect"
              >
                {this.state.options.map(e => {
                  return <option value={e}>{e}</option>;
                })}
              </select>
              <button
                onClick={() => this.addToCart(e.partid, this.state.selected)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      });
    return (
      <div className="shopContainer">
        <Header />
        {partList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.partReducer,
  ...state.userReducer,
  ...state.cartReducer
});

export default withRouter(
  connect(mapStateToProps, {
    getParts,
    addToCart,
    getCart,
    updateCart
  })(Product)
);
