import React, { Component } from "react";
import "./CartParts.css"

import "font-awesome/css/font-awesome.min.css"

// import minus from "../Parts/PartSvgs/minus-circle.svg";
// import plus from "../Parts/PartSvgs/plus-circle.svg"

import { connect } from "react-redux";
import {
    getCart,
    deleteFromCart,
    updateCart,
    getGrandTotal,
    getTotalItems
} from "../../ducks/cartReducer";

class CartParts extends Component {
    constructor(props) {
        super();
        this.state = {
            selected: props.cart[props.index].quantity,
            tot: 0
        };
    }

    handleDecrement() {
        let {selected} = this.state
        --selected
        this.setState({ selected })
    }

    handleIncrement() {
        let {selected} = this.state
        ++selected
        this.setState({ selected })
    }

    handleUpdate(id, selected) {
        this.props.updateCart(id, parseInt(selected, 10)).then(() => {
            this.props.getCart();
            this.props.getGrandTotal();
            this.props.getTotalItems();
        });
    }

    handleDelete(id) {
        this.props.deleteFromCart(id).then(() => {
            this.props.getCart();
            this.props.getGrandTotal();
            this.props.getTotalItems();
        });
    }

    render() {
        const { cart, index, name, model, img, price, partid } = this.props;
        const { selected } = this.state;
        return (
            <div className="cartWrapper" key={index}>
                <h3 className="productName">{name}</h3>
                <h5 className="productNum">Part Number: {model}</h5>
                <img className="productImg" src={img} alt="part" />
                <div className="costContainer">
                    <h5>Qty: {cart[index].quantity}</h5>
                    <h5>${price}/each</h5>
                    <h4>
                        Total: ${Number(`${price * cart[index].quantity}`).toFixed(2)}
                    </h4>
                </div>
                <div>
                    <div className="qtyBtnsContainer">
                        {/* <img className="qtyBtns" src={minus} alt="minus" disabled={selected <= 1 ? true : false} onClick={() => this.handleDecrement()} /> */}
                        <i className="qtyBtns fa fa-minus-circle" disabled={selected <= 1 ? true : false} onClick={() => this.handleDecrement()}></i>
                        <h4>{selected}</h4>
                        {/* <img className="qtyBtns" src={plus} alt="plus" onClick={() => this.handleIncrement()} /> */}
                        <i className="qtyBtns fa fa-plus-circle" disabled={selected <= 1 ? true : false} onClick={() => this.handleIncrement()}></i>
                    </div>
                    <button
                        onClick={() =>
                            this.handleUpdate(
                                partid,
                                parseInt(selected, 10)
                            )
                        }
                    >
                        Update Qty
                  </button>
                    <button onClick={() => this.handleDelete(partid)}>
                        Delete From Cart
                  </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.cartReducer });

export default connect(mapStateToProps, {
    getCart,
    deleteFromCart,
    updateCart,
    getGrandTotal,
    getTotalItems
})(CartParts);
