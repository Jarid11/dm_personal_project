import React, { Component } from "react";
import "./Product.css";

import Header from "../Header/Header";
import Parts from "../Parts/Parts";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getParts } from "../../ducks/partReducer";

import {
  getCart
} from "../../ducks/cartReducer";

class Product extends Component {
  constructor(props) {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.getParts();
    this.props.getCart();
  }

  render() {
    const { parts } = this.props;
    const partList = parts
      .filter(
        e =>
          this.props.location.pathname === "/product"
            ? e.specials === 1
            : e.category === this.props.match.params.type
      )
      .map((e, i) => {
        return (
          <Parts className="productContainer" key={i} index={i} pathLocation={this.props.location.pathname} name={e.name} model={e.model} img={e.img} salePrice={e.saleprice} price={e.price} partId={e.partid} />
        )
      })
    return (
      <div className="shopContainer">
        <Header flag={this.state.flag} />
        {partList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.partReducer,
  ...state.userReducer,
  ...state.cartReducer
});

export default withRouter(
  connect(mapStateToProps, {
    getParts,
    getCart
  })(Product)
);
