import React, { Component } from "react";
import "./Parts.css"
import "font-awesome/css/font-awesome.min.css"
import Swal from 'sweetalert2'

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
    constructor(props) {
        super(props)
            this.state = {
                selected: 1,
                adminFlag: false,
                nameVal: "",
                modelVal: "",
                priceVal: "",
                salePriceVal: props.salePrice,
                specialVal: props.specials,
                categoryVal: props.category
            }
    }


    addToCart(id, qty) {
        if (!this.props.user.name) return Swal({
            title: 'Must Login to add to Cart',
            width: 600,
            padding: '3em',
            imageUrl: 'https://78.media.tumblr.com/d8ec873ce66956d8fbb5ac132b45d1a0/tumblr_o4yshbZXp41tqj6sio1_1280.gif',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login'
          }).then((result) => {
        if (result.value) {
            // window.location.replace("http://localhost:3001/auth"); 
            window.location.replace("/auth"); 
        }
        })
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
        this.props
            .updateCart(id, parseInt(selected, 10))
            .then(() => {
            (this.state.selected > 1) ? (
                Swal({
                    type: 'success',
                    title: 'Added Parts to Cart',
                    allowOutsideClick: false
                    })
            ) : (
                Swal({
                    type: 'success',
                    title: 'Added Part to Cart',
                    allowOutsideClick: false
                    })
            )
                this.props.getCart();
                this.props.getTotalItems();
            })
    }


    handleAdd(id, qty) {
        this.props.addToCart(id, qty).then(() => {
            (this.state.selected > 1) ? (
                Swal({
                    type: 'success',
                    title: 'Added Parts to Cart',
                    allowOutsideClick: false
                    })
            ) : (
                Swal({
                    type: 'success',
                    title: 'Added Part to Cart',
                    allowOutsideClick: false
                    })
            )
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
        const { selected, adminFlag, nameVal, modelVal, priceVal, salePriceVal, specialVal, categoryVal } = this.state;
        //sort duplicates out of category
        let categoryList = parts.filter((curr, index) => {
            return parts.findIndex(item => item.category === curr.category) === index
        })
        // console.log(categoryList)
        return (
            <div className="productContainer" key={index}>
                {this.props.user.admin ?
                    (<div>
                        {adminFlag ? (<div>
                            <div>
                                <h4 className="productName">Name: {name}</h4>
                                <input type="text" placeholder={name} value={nameVal} onChange={(e) => this.handleNameVal(e.target.value)} />
                                <button className="adminBtnColor" onClick={() => this.handleNameChange(partId, nameVal)}>Submit</button>
                            </div>
                            <div>
                                <h4 className="partCategoryText">Category: {category}</h4>
                                <div className="adminCategoryContainer">
                                    <select value={categoryVal} onChange={(e) => this.handleCategoryVal(e.target.value)}>
                                        {categoryList.map((e, i) => {
                                            return (
                                                <option key={i} value={e.category}>{e.category}</option>
                                            )
                                        })}
                                    </select>
                                    <button className="adminBtnColor" onClick={() => this.handleCategoryChange(partId, this.state.categoryVal)}>Change Category</button>
                                </div>
                            </div>
                            <div>
                                <h4 className="partNumText">Part Number: {model}</h4>
                                <input type="text" placeholder={model} value={modelVal} onChange={(e) => this.handleModelVal(e.target.value)} />
                                <button className="adminBtnColor" onClick={() => this.handleModelChange(partId, modelVal)}>Submit</button>
                            </div>
                            <div>
                                {specials ? <h4 className="priceText">Price: ${price}</h4> : <h4>${price}</h4>}
                                <input type="text" placeholder={price} value={priceVal} onChange={(e) => this.handlePriceVal(e.target.value)} />
                                <button className="adminBtnColor" onClick={() => this.handlePriceChange(partId, priceVal)}>Submit</button>
                            </div>
                            <div>
                                <h4 className="saleText">Sale Price: ${salePrice}</h4>
                                <select value={specialVal} onChange={(e) => this.handleSpecialVal(e.target.value)}>
                                    <option value={0}>false</option>
                                    <option value={1}>true</option>
                                </select>

                                {specialVal || specials ? <input type="text" placeholder={salePrice} value={salePriceVal} onChange={(e) => this.handleSalePriceVal(e.target.value)} /> : null}
                                <button className="adminBtnColor" onClick={() => this.handleSpecialChange(partId, specialVal, salePriceVal)}>Submit</button>
                            </div>
                            <button className="adminCancelBtn" onClick={() => this.handleAdminFlag()}>Cancel</button>
                            <h3 className="productName">{name}</h3>
                            <h5 className="productNum">Part Number: {model}</h5>
                            <img className="productImg" src={img} alt="part" />
                            {specials ? <h4 className="regPriceText">${price}</h4> : <h4>${price}</h4>}
                            {specials ? <h4 className="salePriceText">${salePrice}</h4> : null}
                            <div>
                                <div className="qtyBtnsContainer">
                                    <i className="qtyBtns fa fa-minus-circle" onClick={() => this.handleDecrement()}></i>
                                    <h4>{selected}</h4>
                                    <i className="qtyBtns fa fa-plus-circle" onClick={() => this.handleIncrement()}></i>
                                </div>
                                <button
                                    className="addToCartBtn"
                                    onClick={() => this.addToCart(partId, selected)}
                                >
                                    Add to Cart
                                    <i className="fa fa-cart-plus addBtn"></i>
                                </button>
                            </div>
                        </div>) :
                            (<div className="positionPartsWrapper">
                                <div className="adminEditContainer">
                                    <h3 className="productName">{name}</h3>
                                    <i className="fa fa-edit adminEditBtn" onClick={() => this.handleAdminFlag()}></i>
                                </div>
                                <h5 className="productNum">Part Number: {model}</h5>
                                <img className="productImg" src={img} alt="part" />
                                {specials ? <h3 className="regPriceText">${price}</h3> : <h3 className="priceText">${price}</h3>}
                                {specials ? <h3 className="salePriceText">${salePrice}</h3> : null}
                                <div>
                                    <div className="qtyBtnsContainer">
                                        <i className="qtyBtns fa fa-minus-circle" onClick={() => this.handleDecrement()}></i>
                                        <h4>{selected}</h4>
                                        <i className="qtyBtns fa fa-plus-circle" onClick={() => this.handleIncrement()}></i>
                                    </div>
                                    <button className="addToCartBtn" onClick={() => this.addToCart(partId, selected)}
                                >
                                    Add to Cart
                                    <i className="fa fa-cart-plus  addBtn"></i>
                                </button>
                                </div>
                            </div>)}
                    </div>) : (
                        <div className="positionPartsWrapper">
                            <h3 className="productName">{name}</h3>
                            <h5 className="productNum">Part Number: {model}</h5>
                            <img className="productImg" src={img} alt="part" />
                            {specials ? <h3 className="regPriceText">${price}</h3> : <h3 className="priceText">${price}</h3>}
                            {specials ? <h3 className="salePriceText">${salePrice}</h3> : <h3 />}
                            <div>
                                <div className="qtyBtnsContainer">
                                    <i className="qtyBtns fa fa-minus-circle" onClick={() => this.handleDecrement()}></i>
                                    <h4>{selected}</h4>
                                    <i className="qtyBtns fa fa-plus-circle" onClick={() => this.handleIncrement()}></i>
                                </div>
                                <button className="addToCartBtn" onClick={() => this.addToCart(partId, selected)}
                                >
                                    Add to Cart
                                    <i className="fa fa-cart-plus addBtn"></i>
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
