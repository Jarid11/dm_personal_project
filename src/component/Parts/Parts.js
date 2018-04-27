import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
    addToCart,
    getCart,
    updateCart
} from "../../ducks/cartReducer";

import { getParts, changePartName} from "../../ducks/partReducer";

class Parts extends Component {
    constructor() {
        super()
        this.state = {
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            selected: 1,
            nameFlag: false,
            nameVal: ""
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


    //admin methods

    handleNameInput() {
        this.setState({
            nameFlag: !this.state.nameFlag
        })
    }

    handleNameVal(val) {
        this.setState({
            nameVal: val
        })
    }

    handleNameChange(partId, name) {
        this.props.changePartName(partId, name)
        .then(() => {
            this.props.getParts();
        })
    }

    render() {
        const { index, name, model, img, salePrice, price, partId } = this.props;
        const { selected, nameFlag, nameVal } = this.state;
        return (
            <div className="productContainer" key={index}>
                {this.props.user.admin ?
                    (<div>
                        {nameFlag ? <input type="text" placeholder={name} value={nameVal} onChange={(e) => this.handleNameVal(e.target.value)}/> : <h3 className="productName">{name}</h3>} 
                        {!nameFlag ? <button onClick={() => this.handleNameInput()}>Edit</button> : <button onClick={() => this.handleNameChange(partId, nameVal)}>Submit</button>}
                    </div>) : (
                         <h3 className="productName">{name}</h3>
                    )}
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
        updateCart,
        getParts,
        changePartName
    })(Parts)
);
