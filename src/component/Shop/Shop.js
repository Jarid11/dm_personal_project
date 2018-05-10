import React, { Component } from "react";
import "./Shop.css";

import Parts from "../Parts/Parts";

// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { getParts, getPartCategories } from "../../ducks/partReducer";
import { getHamburgerMenu } from '../../ducks/viewReducer';
// import { getCart } from "../../ducks/cartReducer";
// import { getPartCategories } from "../../ducks/partReducer";

import Footer from "../Footer/Footer";

class Shop extends Component {
  constructor(props) {
    super();
    // this.state = {
    //   partName: ""
    // }
  }

  componentDidMount() {
    this.props.getParts();
    // this.props.getCart();
    this.props.getPartCategories();
  }

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  // handleNameInput(val) {
  //   this.setState({
  //     partName: val
  //   })
  // }

  // resetNameInput() {
  //   console.log("hit")
  //   this.setState({
  //     partName: ""
  //   })
  // }

  render() {
    const { parts } = this.props;
    // const { partName } = this.state
    let estDate = new Date();
    const partList = parts
      .filter(
        e =>
          this.props.location.pathname === "/shop"
            ? e.specials === 1
            : e.category === this.props.match.params.type
        // ? e.specials === 1 && e.name.includes(partName)
        // : e.category === this.props.match.params.type && e.name.includes(partName)
      )
      .map((e, i) => {
        return (
          <Parts className="productContainer" key={i} index={i} pathLocation={this.props.location.pathname} name={e.name} model={e.model} category={e.category} img={e.img} specials={e.specials} salePrice={e.saleprice} price={e.price} partId={e.partid} parts={parts} />
        )
      })

    console.log(this.props)
    return (
      <div>
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
            {/* <input type="text" autoComplete='off' onChange={(e) => this.handleNameInput(e.target.value)} /> */}
            {partList}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.partReducer,
  ...state.viewReducer
  // ...state.userReducer,
  // ...state.cartReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getParts,
    // getCart,
    getHamburgerMenu,
    getPartCategories
  })(Shop)
);
