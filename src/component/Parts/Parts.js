import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
    addToCart,
    getCart,
    updateCart
} from "../../ducks/cartReducer";



class Parts extends Component {
    constructor() {
        super()
        this.state = {
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            selected: 1
        }
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
        let estDate = new Date();
        const { index, pathLocation, name, model, img, salePrice, price, partId } = this.props;
        const { selected } = this.state;
        return (
            <div className="productContainer" key={index}>
                {pathLocation === "/product" ? <h2>{estDate.toString()
                    .split(" ")
                    .splice(1, 1)
                    .join(" ")} Specials</h2> : null}
                <h3 className="productName">{name}</h3>
                <h5 className="productNum">Part Number: {model}</h5>
                <img className="productImg" src={img} alt="part" />
                {salePrice ? <h3 className="regPriceText">${price}</h3> : <h3>${price}</h3>}
                {salePrice ? <h3 className="salePriceText">${salePrice}</h3> : null}
                <div>
                    <select
                        onChange={e => this.qtySelectVal(e.target.value)}
                        value={selected}
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
                        onClick={() => this.addToCart(partId, selected)}
                    >
                        Add to Cart
              </button>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    ...state.partReducer,
    ...state.userReducer,
    ...state.cartReducer
});

export default withRouter(
    connect(mapStateToProps, {
        addToCart,
        getCart,
        updateCart
    })(Parts)
);
