import React, { Component } from "react";
import "./Shop.css";

import Part from "../Part/Part";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { getParts, getPartCategories } from "../../ducks/partReducer";
import { getHamburgerMenu } from '../../ducks/viewReducer';

import Footer from "../Footer/Footer";

class Shop extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.getParts();
  }

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  render() {
    const { parts } = this.props;
    let estDate = new Date();
    const partList = parts
      .filter(
        e =>
          this.props.location.pathname === "/shop"
            ? e.specials === 1
            : e.category === this.props.match.params.type
      )
      .map((e, i) => {
        return (
          <Part className="productContainer" key={i} index={i} pathLocation={this.props.location.pathname} name={e.name} model={e.model} category={e.category} img={e.img} specials={e.specials} salePrice={e.saleprice} price={e.price} partId={e.partid} parts={parts} />
        )
      })

    return (
      < div >
      <div className="shopCategoriesAndPartsContainer">
        <div className="shopCategoriesWrapper">
          <h3>Part Categories</h3>
          {this.props.categories.map((e, i) => {
            return (
              <Link to={`/shop/${e.category}`} className="list-lis" key={i} onClick={this.handleBurgers}>
                <div className="shopList">{e.category}</div>
              </Link>
            )
          })}
        </div>
        <div className="shopContainer" onClick={this.handleBurgers}>
          {this.props.location.pathname === "/shop" ? <h2 className="monthlySaleText">{estDate.toString()
            .split(" ")
            .splice(1, 1)
            .join(" ")} Specials</h2> : null}
          {partList}
        </div>
      </div>
      <Footer />
      </div >
    );
  }
}

const mapStateToProps = state => ({
  ...state.partReducer,
  ...state.viewReducer
});

export default withRouter(
  connect(mapStateToProps, {
    getParts,
    getHamburgerMenu,
    getPartCategories
  })(Shop)
);
