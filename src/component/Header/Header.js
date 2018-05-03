import React, { Component } from "react";
import "./Header.css";
// import "font-awesome/css/font-awesome.min.css"

import accountIcon from "./HeaderSvgs/account.svg";
import hamburgerBtnIcon from "./HeaderSvgs/hamburger-btn.svg";
import cartIcon from "./HeaderSvgs/shopping-cart.svg";
import chevronUp from "../Contact/ChevronImgs/chevron-up.svg";
import chevronDown from "../Contact/ChevronImgs/chevron-down.svg";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import { getCart, getTotalItems } from "../../ducks/cartReducer";
import { getPartCategories } from "../../ducks/partReducer";
import { getHamburgerMenu } from "../../ducks/viewReducer";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showCategories: false
    };
  }

  componentDidMount() {
    this.props.getUser().then(()=>{
      if (this.props.user !== "Unauthorized" && this.props.user) {
        this.props.getCart();
        this.props.getTotalItems();
      }
    });
    this.props.getPartCategories();
  }

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  showCategories() {
    this.setState({
      showCategories: !this.state.showCategories
    });
  }

  hideCategories() {
    this.setState({
      showCategories: !this.state.showCategories
    });
  }

  render() {
    const { showCategories } = this.state;
    const { totalItems } = this.props;
    return (
      <div>
        {!this.props.showHamburger ? (
          <header className="header">
            <div className="logo-container">
              <button className="hamburgerBtn" onClick={this.props.getHamburgerMenu}>
                <img
                  className="hamburgerSvg"
                  src={hamburgerBtnIcon}
                  alt="hamburger button"
                />
              </button>
              <div className="logoBox">
              <img
                className="car-image"
                src="http://freepngimages.com/wp-content/uploads/2015/05/volkswagon-beetle-png-image.png"
                alt="car"
              />
              <img
                className="logo"
                src="http://www.bugstuffonline.com/templates/fallback/images/logo.png"
                alt="logo"
              />
              </div>
              <div className="headerLinksWrapper">
                <Link to="/" className="links headerLinks">
                  <div>Home</div>
                </Link>
                <Link to="/product" className="links headerLinks">
                  <div>Shop</div>
                </Link>
                <Link to="/about" className="links headerLinks">
                  <div>About</div>
                </Link>
                <Link to="/privacy" className="links headerLinks">
                  <div>Privacy</div>
                </Link>
              </div>
                <div className="accountAndCartWrapper">
                  <div className="accountWrapper">
                    <Link to="/Account">
                        <div>
                          <img
                            className="accountIcon"
                            src={accountIcon}
                            alt="account icon"
                          />
                        </div>
                      </Link>
                  </div>
                  <div id="cartContainer">
                    <Link to="/cart" className="links cartContainer" onClick={this.handleBurgers}>
                      <img className="cart" src={cartIcon} alt="cart button" />
                      <div className="bubble">
                        <p className="cartCountText">{totalItems}</p>
                      </div>
                    </Link>
                  </div>
              </div>
            </div>
        </header>
        ) : (
            <div>
              <header className="header">
                <div className="logo-container">
                  <button
                    className="hamburgerBtn"
                    onClick={this.props.getHamburgerMenu}
                  >
                    <img
                      className="hamburgerSvg"
                      src={hamburgerBtnIcon}
                      alt="hamburger button"
                    />
                  </button>
                  <img
                    className="car-image"
                    src="http://freepngimages.com/wp-content/uploads/2015/05/volkswagon-beetle-png-image.png"
                    alt="car"
                  />
                  <img
                    className="logo"
                    src="http://www.bugstuffonline.com/templates/fallback/images/logo.png"
                    alt="logo"
                  />
                  <div>
                    <Link to="/cart" className="links cartContainer" onClick={this.handleBurgers}>
                      <img className="cart" src={cartIcon} alt="cart button" />
                      <div className="bubble">
                        <p className="cartCountText">{totalItems}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </header>
              <div className="menu">
                <div className="list">
                  <Link to="/Account" className="links" onClick={this.handleBurgers}>
                    <div className="list-lis">Account</div>
                  </Link>
                  <Link to="/" className="links" onClick={this.handleBurgers}>
                    <div className="list-lis">Home</div>
                  </Link>
                  <div className="links">
                    {!showCategories ? (
                      <div className="list-lis centerChevron">
                        <Link to="/product" onClick={this.handleBurgers}>
                            <p className="shopText">Shop</p>
                            <img className="categoryBtn" onClick={() => this.showCategories()} src={chevronUp} alt="chevronUp" />
                        </Link>
                      </div>
                    ) : (
                        <div>
                          <div className="list-lis centerChevron">
                          <Link to="/product" onClick={this.handleBurgers}>
                            <p className="shopText">Shop</p>
                            <img className="categoryBtn" onClick={() => this.showCategories()} src={chevronDown} alt="chevronUp" />
                        </Link>
                          </div>
                          <div className="list">
                            {this.props.categories.map((e, i) => {
                              return (
                                <Link to={`/product/${e.category}`} className="list-lis" key={i} onClick={this.handleBurgers}>
                                  <div className="shopList">{e.category}</div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                  <Link to="/about" className="links" onClick={this.handleBurgers}>
                    <div className="list-lis">About</div>
                  </Link>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
  ...state.cartReducer,
  ...state.partReducer,
  ...state.viewReducer
});

export default connect(mapStateToProps, { getUser, getCart, getTotalItems, getPartCategories, getHamburgerMenu })(
  Header
);
