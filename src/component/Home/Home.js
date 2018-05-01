import React, { Component } from "react";

import { connect } from "react-redux"

import { getUser } from "../../ducks/userReducer";
import { getHamburgerMenu } from '../../ducks/viewReducer';

import Slides from "../Slides/Slides";
import Manufacturers from "../Manufacturers/Manufacturers";
import Contact from "../Contact/Contact";
import QuickLinks from "../QuickLinks/QuickLinks";

class Home extends Component {

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
      <div onClick={this.handleBurgers}>
        <Slides />
        <Manufacturers />
        <Contact />
        <QuickLinks />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.userReducer, ...state.viewReducer });

export default connect(mapStateToProps, { getUser, getHamburgerMenu })(Home);
