import React, { Component } from "react";

import { connect } from "react-redux"

import { getUser } from "../../ducks/userReducer";
import { getHamburgerMenu } from '../../ducks/viewReducer';

import Slides from "../Slides/Slides";
import Manufacturers from "../Manufacturers/Manufacturers";
import Contact from "../Contact/Contact";
import QuickLinks from "../QuickLinks/QuickLinks";
import Footer from "../Footer/Footer";

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
    console.log(this.props)
    return (
      <div onClick={this.handleBurgers}>
        <Slides />
        <Manufacturers />
        <Contact />
        <QuickLinks />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.userReducer, ...state.viewReducer });

export default connect(mapStateToProps, { getUser, getHamburgerMenu })(Home);
