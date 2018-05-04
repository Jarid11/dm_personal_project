import React, { Component } from "react";
import Swal from 'sweetalert2'

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCart,
  getGrandTotal
} from "../../ducks/cartReducer";

import { getUser } from "../../ducks/userReducer";

import CartParts from "../CartParts/CartParts";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props
      .getUser()
      .then(response => {
        if(response.value.data === "Unauthorized") {
          this.props.history.push("/");
          return Swal({
            title: "User Unauthorized",
            text: "Please login",
            icon: "warning",
            button: "Login"
          }).then(login => {
            if (login) {
              window.location.replace("http://localhost:3001/auth");
            }
          });
          
        }else{
          console.log(response)
          this.props.getCart();
          this.props.getGrandTotal();   
        }
        
      }
      );
  }
  

  render() {
    const { cart, grandTotal } = this.props;
    return (
      <div className="positionCartView">
        {cart[0] ? (
          <div className="cartPositionWrapper">
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

const mapStateToProps = state => ({ ...state.cartReducer, ...state.getUser });

export default connect(mapStateToProps, {
  getCart,
  getGrandTotal,
  getUser
})(Cart);
