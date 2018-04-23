import React, { Component } from "react";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

import Header from "../Header/Header";
import Slides from "../Slides/Slides";
import Manufacturers from "../Manufacturers/Manufacturers";
import Contact from "../Contact/Contact";
import QuickLinks from "../QuickLinks/QuickLinks";
import Footer from "../Footer/Footer";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div>
        <Header />
        <Slides />
        <Manufacturers />
        <Contact />
        <QuickLinks />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.userReducer });

export default connect(mapStateToProps, { getUser })(Home);
