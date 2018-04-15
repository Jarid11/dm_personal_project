import React, { Component } from "react";

import Header from "../../Header/Header";

import { connect } from "react-redux";
import { getParts } from "../../../ducks/reducer";

class Engine extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.getParts();
  }

  render() {
    console.log(this.props.reducer.parts);
    const { parts } = this.props.reducer;
    const partList = parts.filter(e => e.category === "Engine").map(e => {
      return (
        <div key={e.partid}>
          <h3>{e.name}</h3>
          <h4>{e.model}</h4>
          <img src={e.img} alt="part" />
          <h3>{e.price}</h3>
        </div>
      );
    });
    return (
      <div>
        <Header />
        {partList}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getParts })(Engine);
