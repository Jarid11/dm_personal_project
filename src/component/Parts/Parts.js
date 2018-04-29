import React, { Component } from "react";

import "./Parts.css"

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
    addToCart,
    getCart,
    updateCart,
    getTotalItems
} from "../../ducks/cartReducer";

import { getParts, changePartName, changePartCategory, changePartModel, changePartPrice, changePartSpecial } from "../../ducks/partReducer";

class Parts extends Component {
    constructor() {
        super(),
            this.state = {
                selected: 1,
                adminFlag: false,
                nameVal: "",
                modelVal: "",
                priceVal: "",
                salePriceVal: "",
                specialVal: 0,
                categoryVal: "Exterior"
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
        this.props
            .updateCart(id, parseInt(selected, 10))
            .then(() => {
                this.props.getCart();
                this.props.getTotalItems();
            })
    }


    handleAdd(id, qty) {
        this.props.addToCart(id, qty).then(() => {
            this.props.getCart();
            this.props.getTotalItems();
        })
    }


    //admin methods

    handleAdminFlag() {
        this.setState({
            adminFlag: !this.state.adminFlag
        })
    }

    handleNameVal(val) {
        this.setState({
            nameVal: val
        })
    }

    handleModelVal(val) {
        this.setState({
            modelVal: val
        })
    }

    handleCategoryVal(val) {
        this.setState({
            categoryVal: val
        })
    }

    handleSpecialVal(val) {
        this.setState({
            specialVal: val
        })
    }

    handleSalePriceVal(val) {
        this.setState({
            salePriceVal: val
        })
    }

    handlePriceVal(val) {
        this.setState({
            priceVal: val
        })
    }

    handleNameChange(partId, name) {
        this.props.changePartName(partId, name)
            .then(() => {
                this.props.getParts();
            })
    }

    handlePriceChange(partId, price) {
        this.props.changePartPrice(partId, price)
            .then(() => {
                this.props.getParts();
            })
    }

    handleModelChange(partId, model) {
        this.props.changePartModel(partId, model)
            .then(() => {
                this.props.getParts();
            })
    }

    handleCategoryChange(partId, category) {
        this.props.changePartCategory(partId, category).then(() => {
            this.props.getParts();
        })
    }

    handleSpecialChange(partId, special, salePrice) {
        this.props.changePartSpecial(partId, special, salePrice).then(() => {
            this.props.getParts();
        })
    }


    render() {
        const { index, name, model, category, img, specials, salePrice, price, partId, parts } = this.props;
        const { selected, adminFlag, nameVal, modelVal, priceVal, salePriceVal, specialVal } = this.state;

        //sort duplicates out of category
        let categoryList = parts.filter((curr, index) => {
            return parts.findIndex(item => item.category === curr.category) === index
        })
        let onSaleList = parts.filter((curr, index) => {
            return parts.findIndex(item => item.specials === curr.specials) === index
        })
        // console.log(onSaleList)
        return (
            <div className="productContainer" key={index}>
                {this.props.user.admin ?
                    (<div>
                        {adminFlag ? (<div>
                            <div>
                                <h4 className="productName">Name: {name}</h4>
                                <input type="text" placeholder="Enter new part name here" value={nameVal} onChange={(e) => this.handleNameVal(e.target.value)} />
                                <button onClick={() => this.handleAdminFlag()}>Cancel</button>
                                <button onClick={() => this.handleNameChange(partId, nameVal)}>Submit</button>
                            </div>
                            <div>
                                <h4 className="partCategoryText">Category: {category}</h4>
                                <div className="adminCategoryContainer">
                                    <select onChange={(e) => this.handleCategoryVal(e.target.value)}>
                                        {categoryList.map((e, i) => {
                                            return (
                                                <option key={i}>{e.category}</option>
                                            )
                                        })}
                                    </select>
                                    <button onClick={() => this.handleCategoryChange(partId, this.state.categoryVal)}>Change Category</button>
                                </div>
                            </div>
                            <div>
                                <h4 className="partNumText">Part Number: {model}</h4>
                                <input type="text" placeholder={model} value={modelVal} onChange={(e) => this.handleModelVal(e.target.value)} />
                                <button onClick={() => this.handleModelChange(partId, modelVal)}>Submit</button>
                            </div>
                            <div>
                                {specials ? <h4 className="priceText">Price: ${price}</h4> : <h4>${price}</h4>}
                                <input type="text" placeholder="Enter new part price here" value={priceVal} onChange={(e) => this.handlePriceVal(e.target.value)} />
                                <button onClick={() => this.handlePriceChange(partId, priceVal)}>Submit</button>
                            </div>
                            <div>
                                {specials ? <h4 className="saleText">Sale Price: ${salePrice}</h4> : null}
                                <select onChange={(e) => this.handleSpecialVal(e.target.value)}>
                                    {onSaleList.map((e, i) => {
                                        return (
                                            <option key={i}>{e.specials}</option>
                                        )
                                    })}
                                </select>
                                <input type="text" placeholder={salePrice} value={salePriceVal} onChange={(e) => this.handleSalePriceVal(e.target.value)} />
                                <button onClick={() => this.handleSpecialChange(partId, specialVal, salePriceVal)}>Submit</button>
                            </div>
                            <h3 className="productName">{name}</h3>
                            <h5 className="productNum">Part Number: {model}</h5>
                            <img className="productImg" src={img} alt="part" />
                            {specials ? <h4 className="regPriceText">${price}</h4> : <h4>${price}</h4>}
                            {specials ? <h4 className="salePriceText">${salePrice}</h4> : null}
                            <div>
                                <div className="qtyBtnsContainer">
                                    <button disabled={selected < 1 ? true : false} onClick={() => this.handleDecrement()}>-</button>
                                    <h4>{selected}</h4>
                                    <button onClick={() => this.handleIncrement()}>+</button>
                                </div>
                                <button
                                    onClick={() => this.addToCart(partId, selected)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>) :
                            (<div>
                                <div className="adminEditContainer">
                                    <h3 className="productName">{name}</h3>
                                    <button onClick={() => this.handleAdminFlag()}>Edit</button>
                                </div>
                                <h5 className="productNum">Part Number: {model}</h5>
                                <img className="productImg" src={img} alt="part" />
                                {specials ? <h3 className="regPriceText">${price}</h3> : <h3>${price}</h3>}
                                {specials ? <h3 className="salePriceText">${salePrice}</h3> : null}
                                <div>
                                    <div className="qtyBtnsContainer">
                                        <button disabled={selected < 1 ? true : false} onClick={() => this.handleDecrement()}>-</button>
                                        <h4>{selected}</h4>
                                        <button onClick={() => this.handleIncrement()}>+</button>
                                    </div>
                                    <button
                                        onClick={() => this.addToCart(partId, selected)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>)}
                    </div>) : (
                        <div>
                            <h3 className="productName">{name}</h3>
                            <h5 className="productNum">Part Number: {model}</h5>
                            <img className="productImg" src={img} alt="part" />
                            {specials ? <h3 className="regPriceText">${price}</h3> : <h3>${price}</h3>}
                            {specials ? <h3 className="salePriceText">${salePrice}</h3> : null}
                            <div>
                                <div className="qtyBtnsContainer">
                                    <button disabled={selected < 1 ? true : false} onClick={() => this.handleDecrement()}>-</button>
                                    <h4>{selected}</h4>
                                    <button onClick={() => this.handleIncrement()}>+</button>
                                </div>
                                <button
                                    onClick={() => this.addToCart(partId, selected)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    )}
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
        getTotalItems,
        changePartName,
        changePartCategory,
        changePartModel,
        changePartPrice,
        changePartSpecial
    })(Parts)
);
