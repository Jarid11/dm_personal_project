import React, { Component } from "react";
import Swal from 'sweetalert2'

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getGrandTotal
} from "../../ducks/cartReducer";

import { getUser } from "../../ducks/userReducer";
import { getCart } from "../../ducks/cartReducer";

import CartParts from "../CartParts/CartParts";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    if(this.props.user.userid) {
      this.props.getCart();
      this.props.getGrandTotal();  
    } else {
        this.props.history.push("/");
        return Swal({
            title: 'Must Login to go to Cart',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login'
          }).then((result) => {
            if (result.value) {
              // window.location.replace("http://localhost:3001/auth"); 
              window.location.replace("/"); 
            }
          })
  }
}
  
  render() {
    const { cart, grandTotal } = this.props;
    return (
      <div className="positionCartView">
        {cart[0] ? (
        <div>
          <div className="cartPositionWrapper">
            {cart.map((e, i) => {
              return (
              <CartParts key={i} index={i} name={e.name} model={e.model}
                img={e.img} price={e.price} partid={e.partid} />
              )
            })}
          </div>
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
            <div className="empty-cart-container">
              <h2>Nothing In Cart</h2>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.cartReducer, ...state.userReducer });

export default connect(mapStateToProps, {
  getGrandTotal,
  getUser,
  getCart
})(Cart);
