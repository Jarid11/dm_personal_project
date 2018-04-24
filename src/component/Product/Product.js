import React, { Component } from "react";
import "./Product.css";

import Header from "../Header/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getParts } from "../../ducks/partReducer";

// import { updateTotalItems } from "../Header/Header";

import {
  addToCart,
  getCart,
  updateCart,
  getTotalItems
} from "../../ducks/cartReducer";

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
          let newQty =
            parseInt(this.props.cart[i].quantity, 10) + parseInt(qty, 10);
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
      .updateCart(id, parseInt(selected, 10))
      .then(() => this.props.getCart());
  }

  handleAdd(id, qty) {
    this.props.addToCart(id, qty).then(() => this.props.getCart());
  }

  render() {
    const { parts } = this.props;
    let estDate = new Date();
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
            {this.props.location.pathname === "/product" ? <h2>{estDate.toString()
              .split(" ")
              .splice(1, 1)
              .join(" ")} Specials</h2> : null}
            <h3 className="productName">{e.name}</h3>
            <h5 className="productNum">Part Number: {e.model}</h5>
            <img className="productImg" src={e.img} alt="part" />
            {e.saleprice ? <h3 className="regPriceText">${e.price}</h3> : <h3>${e.price}</h3>}
            {e.saleprice ? <h3 className="salePriceText">${e.saleprice}</h3> : null}
            <div>
              <select
                onChange={e => this.qtySelectVal(e.target.value)}
                value={this.state.selected}
                id="qtySelect"
              >
                {this.state.options.map((e, i) => {
                  return (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  );
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
        <Header flag={this.state.flag} />
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
    updateCart,
    getTotalItems
  })(Product)
);
