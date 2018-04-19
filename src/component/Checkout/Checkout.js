import React, { Component } from "react";
import "./Checkout.css";

import Header from "../Header/Header";
import cartIcon from "../Header/HeaderSvgs/shopping-cart.svg";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import {
  getCart,
  getTotalItems,
  getGrandTotal,
  getCartImgs
} from "../../ducks/cartReducer";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      step1: true,
      step2: false,
      step3: false,
      standardShip: 7.99,
      expressShip: 15.99,
      shipCost: 7.99
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getCart();
    this.props.getTotalItems();
    this.props.getGrandTotal();
    this.props.getCartImgs();
  }

  handleStandardShip() {
    this.setState({
      shipCost: this.state.standardShip
    });
  }

  handleExpressShip() {
    this.setState({
      shipCost: this.state.expressShip
    });
  }

  render() {
    const {
      step1,
      step2,
      step3,
      standardShip,
      expressShip,
      shipCost
    } = this.state;
    const { cart, totalItems, grandTotal, cartImgs } = this.props;
    const subTotal = grandTotal.toFixed(2);
    const tax = (grandTotal.toFixed(2) * 0.06).toFixed(2);
    const total = Number(subTotal) + Number(tax) + Number(shipCost);

    const cartImgList = cartImgs.map(e => {
      console.log(e.img);
      return (
        <div className="imgBoxes">
          <img className="itemImgContainer" src={e.img} alt="items" />
        </div>
      );
    });

    return (
      <div>
        <header className="header">
          <div className="logo-container">
            <div className="cartContainer">
              <Link to="/cart" className="links">
                <img className="cart" src={cartIcon} alt="cart button" />
                <div className="bubble">
                  <p className="cartCountText">{totalItems}</p>
                </div>
              </Link>
            </div>
            <img
              className="logo"
              src="http://www.bugstuffonline.com/templates/fallback/images/logo.png"
              alt="logo"
            />
          </div>
        </header>
        <div className="checkoutContainer">
          <div className="step1Container">
            <div className="stepNumBox">
              <p>1</p>
            </div>
            <h3>Shipping Cost</h3>
          </div>
          <div className="shippingOptsContainer">
            <button
              className="shippingBtns"
              onClick={() => this.handleStandardShip()}
            >
              Standard Shipping
            </button>
            <button
              className="shippingBtns"
              onClick={() => this.handleExpressShip()}
            >
              Express Shipping
            </button>
          </div>
          <div className="arrivalContainer">
            <h4>Arrive by</h4>
            <div className="arrivalBox">
              <h5>
                {`${new Date().getMonth() + 1} /
                  ${new Date().getDate() + 7} /
                  ${new Date().getYear() - 100}`}
              </h5>
              <h5>{shipCost}</h5>
            </div>
          </div>

          <div className="cartImgContainer">{cartImgList}</div>

          <div className="totalContainer">
            <div className="subtotalBox">
              <h5>Subtotal ({totalItems} items )</h5>
              <h5>${subTotal}</h5>
            </div>
            <div className="shippingBox">
              <h5>Shipping</h5>
              <h5>${shipCost}</h5>
            </div>
            <div className="taxesBox">
              <h5>{`Est. Taxes & fees`}</h5>
              <h5>${tax}</h5>
            </div>
            <div className="totalBox">
              <h4>Est. total</h4>
              <h4>${total.toFixed(2)}</h4>
            </div>
            <div className="itemDropdown">
              <h5>See item details +</h5>
            </div>
          </div>
        </div>

        <footer className="checkoutFooter">
          <button className="contBtn">Continue</button>
          <div className="footerTotBox">
            <h5 className="footerTotText"> Est. total</h5>
            <h4 className="footerTotAmount">$$$$</h4>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
  ...state.cartReducer
});

export default connect(mapStateToProps, {
  getUser,
  getCart,
  getTotalItems,
  getGrandTotal,
  getCartImgs
})(Checkout);
