import React, { Component } from "react";

import "./Parts.css"

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
    addToCart,
    getCart,
    updateCart
} from "../../ducks/cartReducer";

import { getParts, changePartName, changePartCategory, changePartModel } from "../../ducks/partReducer";

class Parts extends Component {
    constructor() {
        super()
        this.state = {
            selected: 1,
            adminFlag: false,
            nameVal: "",
            modelVal: "",
            categoryVal: "Engine"
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
            .then(() => this.props.getCart());
    }


    handleAdd(id, qty) {
        this.props.addToCart(id, qty).then(() => this.props.getCart());
    }


    //admin methods

    handleNameInput() {
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

    handleCategoryValue(val) {
        this.setState({
            categoryVal: val
        })
    }

    handleNameChange(partId, name) {
        this.props.changePartName(partId, name)
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

    render() {
        const { index, name, model, category, img, salePrice, price, partId, parts } = this.props;
        const { selected, adminFlag, nameVal, modelVal } = this.state;

        //sort duplicates out of category
        let categoryList = parts.filter((curr, index) => { 
           return  parts.findIndex(item => item.category === curr.category) === index 
        })
        return (
            <div className="productContainer" key={index}>
                {this.props.user.admin ?
                    (<div>
                        {adminFlag ? (<div>
                            <div>
                                <input type="text" placeholder={name} value={nameVal} onChange={(e) => this.handleNameVal(e.target.value)} />
                                <button onClick={() => this.handleNameInput()}>Cancel</button>
                                <button onClick={() => this.handleNameChange(partId, nameVal)}>Submit</button>
                            </div>
                            <div class="adminCategoryContainer">
                                <h4 className="productName">Category: {category}</h4>
                                <select className="categorySelect" onChange={(e) => this.handleCategoryValue(e.target.value)}>
                                    { categoryList.map((e,i) => {
                                        return (
                                            <option key={i}>{e.category}</option>
                                        )
                                    }) }
                                </select>
                                <button onClick={() => this.handleCategoryChange(partId, this.state.categoryVal)}>Change Category</button>
                            </div>
                            <div>
                                <h5 className="productNum">Part Number: {model}</h5>
                                <input type="text" placeholder={model} value={modelVal} onChange={(e) => this.handleModelVal(e.target.value)}  />
                                <button onClick={() => this.handleModelChange(partId, modelVal)}>Submit</button>
                            </div>
                        </div>) :
                            (<div className="adminEditContainer">
                                <h3 className="productName">{name}</h3>
                                <button onClick={() => this.handleNameInput()}>Edit</button>
                                <h5 className="productNum">Part Number: {model}</h5>
                            </div>)}
                    </div>) : (
                        <div>
                            <h3 className="productName">{name}</h3>
                            <h5 className="productNum">Part Number: {model}</h5>
                        </div>
                    )}
                {/* <h5 className="productNum">Part Number: {model}</h5> */}
                <img className="productImg" src={img} alt="part" />
                {salePrice ? <h3 className="regPriceText">${price}</h3> : <h3>${price}</h3>}
                {salePrice ? <h3 className="salePriceText">${salePrice}</h3> : null}
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
        changePartName,
        changePartCategory,
        changePartModel
    })(Parts)
);
