import React, { Component } from "react";
import "./Product.css";

// import Header from "../Header/Header";
import Parts from "../Parts/Parts";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getParts } from "../../ducks/partReducer";
import { getHamburgerMenu } from '../../ducks/viewReducer';
import { getCart } from "../../ducks/cartReducer";
import { getPartCategories } from "../../ducks/partReducer";

class Product extends Component {
  constructor(props) {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.getParts();
    this.props.getCart();
    this.props.getPartCategories();
  }

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  render() {
    console.log(this.props)
    const { parts } = this.props;
    let estDate = new Date();
    const partList = parts
      .filter(
        e =>
          this.props.location.pathname === "/product"
            ? e.specials === 1
            : e.category === this.props.match.params.type
      )
      .map((e, i) => {
        return (
          <Parts className="productContainer" key={i} index={i} pathLocation={this.props.location.pathname} name={e.name} model={e.model} category={e.category} img={e.img} specials={e.specials} salePrice={e.saleprice} price={e.price} partId={e.partid} parts={parts} />
        )
      })
    return (
      <div className="shopCategoriesAndPartsContainer">
        <div className="shopCategoriesWrapper">
          <h3>Part Categories</h3>
          {this.props.categories.map((e, i) => {
                        return (
                          <Link to={`/product/${e.category}`} className="list-lis" key={i} onClick={this.handleBurgers}>
                            <div className="shopList">{e.category}</div>
                          </Link>
                        )
          })}
        </div>
        <div className="shopContainer"  onClick={this.handleBurgers}>
          {this.props.location.pathname === "/product" ? <h2 className="monthlySaleText">{estDate.toString()
          .split(" ")
          .splice(1, 1)
          .join(" ")} Specials</h2> : null}
          {partList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.partReducer,
  ...state.userReducer,
  ...state.cartReducer,
  ...state.viewReducer
});

export default withRouter(
  connect(mapStateToProps, {
    getParts,
    getCart,
    getHamburgerMenu,
    getPartCategories
  })(Product)
);
