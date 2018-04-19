import React, { Component } from "react";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

import Header from "../Header/Header";
import Slides from "../Slides/Slides";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div>
        <Header />
        <Slides />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.userReducer });

export default connect(mapStateToProps, { getUser })(Home);
