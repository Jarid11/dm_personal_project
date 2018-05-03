import React, { Component } from "react";
import "./Account.css";

import { connect } from "react-redux";

import { getUser } from "../../ducks/userReducer";
import {getHamburgerMenu} from '../../ducks/viewReducer'

class Account extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  render() {
    return (
      <div className="positionAccount" onClick={this.handleBurgers}>
        {this.props.user.name ? (
          <div>
            <div className="accImgContainer">
              <h4>{this.props.user.name}</h4>
              <img
                className="accImg"
                src={this.props.user.img}
                alt="account pic"
              />
              <a href={process.env.REACT_APP_LOGOUT}>
                <button>Logout</button>
              </a>
              <p>Account</p>
            </div>
          </div>
        ) : (
          <div className="positionAccount">
            <p>Login to your account and start shopping today!</p>
            <a href={process.env.REACT_APP_LOGIN}>
              <button>Login</button>
            </a>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.userReducer, ...state.viewReducer });

export default connect(mapStateToProps, { getUser, getHamburgerMenu })(Account);
