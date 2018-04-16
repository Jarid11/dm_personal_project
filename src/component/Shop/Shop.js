import React, { Component } from "react";
import "./Shop.css";

import { connect } from "react-redux";
import { getParts } from "../../ducks/partReducer";

import Header from "../Header/Header";

class Shop extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.getParts();
  }

  render() {
    const { parts } = this.props.partReducer;
    const partList = parts.filter(e => e.specials === 1).map(e => {
      return (
        <div className="partContainer" key={e.partid}>
          <h3 className="partName">{e.name}</h3>
          <h5 className="modelNum">Part Number: {e.model}</h5>
          <img className="partImg" src={e.img} alt="part" />
          <h3>${e.price}</h3>
        </div>
      );
    });
    return (
      <div className="shopContainer">
        <Header />
        <h2>Parts on Sale</h2>
        {partList}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getParts })(Shop);
