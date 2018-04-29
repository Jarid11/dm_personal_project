import React, { Component } from "react";

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
            selected: 1,
            tot: 0
        };
    }

    handleDecrement() {
        this.setState({
            selected: --this.state.selected
        })
    }

    handleIncrement() {
        this.setState({
            selected: ++this.state.selected
        })
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
            <div className="productContainer" key={index}>
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
                        <button disabled={selected < 1 ? true : false} onClick={() => this.handleDecrement()}>-</button>
                        <h4>{selected}</h4>
                        <button onClick={() => this.handleIncrement()}>+</button>
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
