import React, { Component } from "react";

import Header from "../Header/Header";
import Slides from "../Slides/Slides";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Slides />
      </div>
    );
  }
}

export default Home;
