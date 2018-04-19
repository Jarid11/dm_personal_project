import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCart,
  deleteFromCart,
  updateCart,
  getGrandTotal
} from "../../ducks/cartReducer";

import Header from "../Header/Header";

class Cart extends Component {
  constructor(props) {
    super();
    this.state = {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selected: 1,
      tot: 0
    };
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getGrandTotal();
  }

  qtySelectVal(val) {
    this.setState({
      selected: val
    });
  }

  handleUpdate(id, selected) {
    this.props.updateCart(id, parseInt(selected)).then(() => {
      this.props.getCart();
      this.props.getGrandTotal();
    });
  }

  handleDelete(id) {
    this.props.deleteFromCart(id).then(() => {
      this.props.getCart();
      this.props.getGrandTotal();
    });
  }

  render() {
    const { cart, grandTotal } = this.props;
    return (
      <div>
        <Header />
        {cart[0] ? (
          <div>
            <div>
              <Link to="/checkout">
                <h4>Est. Total: ${grandTotal.toFixed(2)}</h4>
                <button>CHECK OUT</button>
              </Link>
            </div>
            {cart.map((e, i) => (
              <div className="productContainer" key={i}>
                <h3 className="productName">{e.name}</h3>
                <h5 className="productNum">Part Number: {e.model}</h5>
                <img className="productImg" src={e.img} alt="part" />
                <div className="costContainer">
                  <h5>Qty: {cart[i].quantity}</h5>
                  <h5>${e.price}/each</h5>
                  <h4>
                    Total: ${Number(`${e.price * cart[i].quantity}`).toFixed(2)}
                  </h4>
                </div>
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
                    onClick={() =>
                      this.handleUpdate(e.partid, parseInt(this.state.selected))
                    }
                  >
                    Update Qty
                  </button>
                  <button onClick={() => this.handleDelete(e.partid)}>
                    Delete From Cart
                  </button>
                </div>
              </div>
            ))}
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
  deleteFromCart,
  updateCart,
  getGrandTotal
})(Cart);
