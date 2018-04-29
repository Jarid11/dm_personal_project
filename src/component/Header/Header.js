import React, { Component } from "react";
import "./Header.css";

import accountIcon from "./HeaderSvgs/account.svg";
// import phoneIcon from "./HeaderSvgs/phone.svg";
import hamburgerBtnIcon from "./HeaderSvgs/hamburger-btn.svg";
import cartIcon from "./HeaderSvgs/shopping-cart.svg";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import { getCart, getTotalItems } from "../../ducks/cartReducer";
import { getPartCategories } from "../../ducks/partReducer";

class Header extends Component {
    constructor() {
      super();
      this.state = {
        showMenu: false,
        showCategories: false
      };
    }

    componentDidMount() {
      this.props.getUser();
      this.props.getCart();
      this.props.getTotalItems();
      this.props.getPartCategories();
    }

    showMenu() {
      this.setState({
        showMenu: !this.state.showMenu
      });
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
      const { showMenu, showCategories, dropdown } = this.state;
      const { totalItems } = this.props;
      return (
        <div>
          {!showMenu ? (
            <header className="header">
              <div className="logo-container">
                <button className="hamburgerBtn" onClick={() => this.showMenu()}>
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
                  <Link to="/cart" className="links cartContainer">
                    <img className="cart" src={cartIcon} alt="cart button" />
                    <div className="bubble">
                      <p className="cartCountText">{totalItems}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </header>
          ) : (
              <div>
                <header className="header">
                  <div className="logo-container">
                    <button
                      className="hamburgerBtn"
                      onClick={() => this.showMenu()}
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
                      <Link to="/cart" className="links cartContainer">
                        <img className="cart" src={cartIcon} alt="cart button" />
                        <div className="bubble">
                          <p className="cartCountText">{totalItems}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </header>
                <div className="menu">
                  <div className="menu-btns-container">
                    <Link to="/Account">
                      <div>
                        <img
                          className="accountIcon"
                          src={accountIcon}
                          alt="account icon"
                        />
                        <button className="menu-btns">Account</button>
                      </div>
                    </Link>
                    {/* <Link to="/Contact">
                  <div>
                    <img
                      className="phoneIcon"
                      src={phoneIcon}
                      alt="phone icon"
                    />
                    <button className="menu-btns">Contact</button>
                  </div>
                </Link> */}
                  </div>
                  <div className="list">
                    <Link to="/" className="links">
                      <div className="list-lis">Home</div>
                    </Link>
                    <div className="links">
                      {!showCategories ? (
                        <div className="list-lis">
                          <Link to="/product">
                            <button
                              className="categoryBtn"
                              onClick={() => this.showCategories()}
                            >
                              <p className="shopText">Shop</p>
                              {dropdown}
                            </button>
                          </Link>
                        </div>
                      ) : (
                          <div>
                            <div className="list-lis">
                              <button
                                className="categoryBtn"
                                onClick={() => this.hideCategories()}
                              >
                                <p className="shopText boldShop">Shop</p>
                                {dropdown}
                              </button>
                            </div>
                            <div className="list">
                            {this.props.categories.map((e,i) => {
                              return (
                              <Link to={`/product/${e.category}`} className="list-lis" key={i}>
                                <div className="shopList">{e.category}</div>
                              </Link>
                            )})}
                            </div>
                          </div>
                        )}
                    </div>
                    <Link to="/events" className="links">
                      <div className="list-lis">Events</div>
                    </Link>
                    <Link to="/about" className="links">
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
  ...state.partReducer
});

export default connect(mapStateToProps, { getUser, getCart, getTotalItems, getPartCategories })(
  Header
);
