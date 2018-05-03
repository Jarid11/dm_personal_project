import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCart,
  getGrandTotal
} from "../../ducks/cartReducer";

import CartParts from "../CartParts/CartParts";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getGrandTotal();
  }

  render() {
    const { cart, grandTotal } = this.props;
    return (
      <div className="positionCartView">
        {cart[0] ? (
          <div>
            {cart.map((e, i) => (
              <CartParts key={i} index={i} name={e.name} model={e.model}
                img={e.img} price={e.price} partid={e.partid} />))}
            <div className="grandTotalContainer">
              <div className="checkOutBoxes checkOutTextBox">
                <h4 className="grandTotalText">
                  Est. Total: ${grandTotal.toFixed(2)}
                </h4>
              </div>
              <Link to="/checkout" className="links">
                <div className="checkOutBoxes checkOutBtnBox">
                  <button className="checkOutBtn">CHECK OUT</button>
                </div>
              </Link>
            </div>
          </div>
        ) : (
            <div>
              <div>Nothing In Cart</div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.cartReducer });

export default connect(mapStateToProps, {
  getCart,
  getGrandTotal
})(Cart);
