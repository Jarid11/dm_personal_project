import React, { Component } from "react";
import "./Header.css";

import { Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      showCategories: false,
      dropdown: ""
    };
  }

  //takeout state.dropdown if sticking with bolded shop dropdown

  showMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  showCategories() {
    console.log("test");
    this.setState({
      showCategories: !this.state.showCategories,
      dropdown: ""
    });
  }

  hideCategories() {
    this.setState({
      showCategories: !this.state.showCategories,
      dropdown: ""
    });
  }

  render() {
    const { showMenu, showCategories, dropdown } = this.state;
    return (
      <div>
        {!showMenu ? (
          <header className="header">
            <div className="logo-container">
              <button className="hamburgerBtn" onClick={() => this.showMenu()}>
                <svg
                  className="hamburgerSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                </svg>
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
                <svg
                  className="cart"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
                </svg>
                <svg
                  className="bubble"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z" />
                </svg>
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
                  <svg
                    className="hamburgerSvg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                  </svg>
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
                  <svg
                    className="cart"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
                  </svg>
                  <svg
                    className="bubble"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z" />
                  </svg>
                </div>
              </div>
            </header>
            <div className="menu">
              <div className="menu-btns">
                <Link to="/Account">
                  <button>Account</button>
                </Link>
                <Link to="/Contact">
                  <button>Contact</button>
                </Link>
              </div>
              <ul className="list">
                <Link to="/" className="links">
                  <li className="list-lis">Home</li>
                </Link>
                <Link to="/shop" className="links">
                  {!showCategories ? (
                    <div className="list-lis">
                      <button
                        className="categoryBtn"
                        onClick={() => this.showCategories()}
                      >
                        <p className="shopText">Shop</p>
                        {dropdown}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="list-lis">
                        {/* <p className="shopText">Shop</p> */}
                        <button
                          className="categoryBtn"
                          onClick={() => this.hideCategories()}
                        >
                          <p className="shopText boldShop">Shop</p>
                          {dropdown}
                        </button>
                      </div>
                      <ul className="list">
                        <Link to="/engine">
                          <li className="list-lis">Engine</li>
                        </Link>
                        <Link to="/interior">
                          <li className="list-lis">Interior</li>
                        </Link>
                        <Link to="/exterior">
                          <li className="list-lis">Exterior</li>
                        </Link>
                        <Link to="/electrical">
                          <li className="list-lis">Electrical</li>
                        </Link>
                        <Link to="/brakes">
                          <li className="list-lis">Brakes</li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </Link>
                <Link to="/events" className="links">
                  <li className="list-lis">Events</li>
                </Link>
                <Link to="/about" className="links">
                  <li className="extraSpace">About</li>
                </Link>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
