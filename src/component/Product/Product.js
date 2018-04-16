import React, { Component } from "react";
import "./Product.css";

import Header from "../../Header/Header";

import { connect } from "react-redux";
import { getParts } from "../../../ducks/partReducer";

class Product extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.getParts();
  }

  render() {
    const { parts } = this.props.partReducer;
    console.log(parts);
    const partList = parts
      .filter(e => e.category === this.props.match.params.type)
      .map(e => {
        return (
          <div className="productContainer" key={e.partid}>
            <h3 className="productName">{e.name}</h3>
            <h5 className="productNum">Part Number: {e.model}</h5>
            <img className="productImg" src={e.img} alt="part" />
            <h3>${e.price}</h3>
          </div>
        );
      });
    return (
      <div className="shopContainer">
        <Header />
        {partList}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getParts })(Product);
