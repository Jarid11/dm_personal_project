import React, { Component } from "react";
import "./Header.css";
import Swal from "sweetalert2";

import accountIcon from "./HeaderSvgs/account.svg";
import accountIconForMobile from "./HeaderSvgs/account.1.svg";
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
      showCategories: false,
      showAccount: false
    };
  }

  componentDidMount() {
    this.props
      .getUser()
      .then(() => {
        this.props.getPartCategories();
        this.props.getTotalItems();
        this.props.getCart();
      })
      .catch(err => {
        err && this.props.getPartCategories();
      });
  }

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu();
    }
  };

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

  toggleAccount() {
    this.setState({
      showAccount: !this.state.showAccount
    });
  }

  render() {
    const { showCategories, showAccount } = this.state;
    const { totalItems, user } = this.props;
    return (
      <div>
        {!this.props.showHamburger ? (
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
              <div className="logoBox">
                <Link to="/" className="logoBox">
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
                </Link>
              </div>
              <div className="headerLinksWrapper">
                <div className="testWidth">
                  <Link to="/" className="links headerLinks">
                    <div>Home</div>
                  </Link>
                </div>
                <div className="testWidth">
                  <Link to="/shop" className="links headerLinks">
                    <div>Shop</div>
                  </Link>
                </div>
                <div className="testWidth">
                  <Link to="/about" className="links headerLinks">
                    <div>About</div>
                  </Link>
                </div>
                <div className="testWidth">
                  <Link to="/privacy" className="links headerLinks">
                    <div>Privacy</div>
                  </Link>
                </div>
              </div>
              <div className="accountAndCartWrapper">
                <div className="accountWrapper">
                  {user.img ? (
                    <div className="avatarContainer">
                      <img
                        src={user.img}
                        className="accountAvatarIcon"
                        alt="user"
                      />
                      <div className="logoutOnHover">
                        <a
                          className="accLinks"
                          href={process.env.REACT_APP_LOGOUT}
                        >
                          <p>Logout</p>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="avatarContainer">
                      <img
                        className="accountIcon"
                        src={accountIcon}
                        alt="account icon"
                      />
                      <div className="loginOnHover">
                        <a
                          className="accLinks"
                          href={process.env.REACT_APP_LOGIN}
                        >
                          <p>Login</p>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div id="cartContainer">
                  {this.props.user.userid ? (
                    <Link
                      to="/cart"
                      className="links cartContainer"
                      onClick={this.handleBurgers}
                    >
                      <img className="cart" src={cartIcon} alt="cart button" />
                      <div className="bubble">
                        <p className="cartCountText">{Number(totalItems)}</p>
                      </div>
                    </Link>
                  ) : (
                    <div
                      to="/cart"
                      className="links cartContainer"
                      onClick={() => {
                        this.handleBurgers();
                        Swal({
                          title: "Must Login to add to Cart",
                          width: 600,
                          padding: "3em",
                          imageUrl:
                            "https://78.media.tumblr.com/d8ec873ce66956d8fbb5ac132b45d1a0/tumblr_o4yshbZXp41tqj6sio1_1280.gif",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Login"
                        }).then(result => {
                          if (result.value) {
                            window.location.replace(
                              process.env.REACT_APP_AUTH_URL
                            );
                          }
                        });
                      }}
                    >
                      <img className="cart" src={cartIcon} alt="cart button" />
                      <div className="bubble">
                        <p className="cartCountText">{Number(totalItems)}</p>
                      </div>
                    </div>
                  )}
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
                <Link to="/" className="logoBox">
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
                </Link>
                <div>
                  <Link
                    to="/cart"
                    className="links cartContainer"
                    onClick={this.handleBurgers}
                  >
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
                <Link to="/" className="links" onClick={this.handleBurgers}>
                  <div className="list-lis">Home</div>
                </Link>
                <div className="links">
                  {!showCategories ? (
                    <div className="centerChevron">
                      <Link to="/shop">
                        <p className="shopText" onClick={this.handleBurgers}>
                          Shop
                        </p>
                        <img
                          className="categoryBtn"
                          onClick={() => this.showCategories()}
                          src={chevronUp}
                          alt="chevronUp"
                        />
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div className="centerChevron">
                        <Link to="/shop">
                          <p className="shopText" onClick={this.handleBurgers}>
                            Shop
                          </p>
                          <img
                            className="categoryBtn"
                            onClick={() => this.showCategories()}
                            src={chevronDown}
                            alt="chevronUp"
                          />
                        </Link>
                      </div>
                      <div className="list">
                        {this.props.categories.map((e, i) => {
                          return (
                            <Link
                              to={`/shop/${e.category}`}
                              className="list-lis"
                              key={i}
                              onClick={this.handleBurgers}
                            >
                              <div className="shopList">{e.category}</div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/about"
                  className="links"
                  onClick={this.handleBurgers}
                >
                  <div className="aboutStyle">About</div>
                </Link>
                {user.img ? (
                  <div
                    className="accDivSpacing"
                    onClick={() => this.toggleAccount()}
                  >
                    <img
                      src={user.img}
                      className="accountAvatarIconForMobile"
                      alt="user"
                    />
                    {showAccount ? (
                      <div className="accDiv">
                        <a
                          className="accLinks"
                          href={process.env.REACT_APP_LOGOUT}
                        >
                          <p>Logout</p>
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div
                    className="accDivSpacing"
                    onClick={() => this.toggleAccount()}
                  >
                    <img
                      className="accountIcon"
                      src={accountIconForMobile}
                      alt="account icon"
                    />
                    {showAccount ? (
                      <div className="accDiv">
                        <a
                          className="accLinks"
                          href={process.env.REACT_APP_LOGIN}
                        >
                          <p>Login</p>
                        </a>
                      </div>
                    ) : null}
                  </div>
                )}
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

export default connect(
  mapStateToProps,
  { getUser, getCart, getTotalItems, getPartCategories, getHamburgerMenu }
)(Header);
