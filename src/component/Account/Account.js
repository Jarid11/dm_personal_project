import React, { Component } from "react";
import "./Account.css";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

import Header from "../Header/Header";

class Account extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div>
        {this.props.user.name ? (
          <div>
            <Header />
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
          <div>
            <Header />
            <a href={process.env.REACT_APP_LOGIN}>
              <button>Login</button>
            </a>
            <p>Account</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.userReducer });

export default connect(mapStateToProps, { getUser })(Account);
