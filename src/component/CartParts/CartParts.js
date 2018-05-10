import React, { Component } from "react";
import "./CartParts.css"

import "font-awesome/css/font-awesome.min.css"

import updateIcon from "./update.svg"

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
        if (selected >= 2) {
        --selected
        this.setState({ selected })
        }
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
                        <i className="qtyBtns fa fa-minus-circle" onClick={() => this.handleDecrement()}></i>
                        <h4>{selected}</h4>
                        <i className="qtyBtns fa fa-plus-circle" onClick={() => this.handleIncrement()}></i>
                    </div>
                    <div className="manageCartContainer">
                        <button
                            className="updateBtn"
                            onClick={() => this.handleUpdate(partid, parseInt(selected, 10))}>
                            Update
                            <img src={updateIcon} alt="update" />
                        </button>
                        <button className="removeFromCartBtn" onClick={() => this.handleDelete(partid)}>
                            Delete
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
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
