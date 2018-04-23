import React, { Component } from "react";
import "./QuickLinks.css";

import chevronUp from "../Contact/ChevronImgs/chevron-up.svg";
import chevronDown from "../Contact/ChevronImgs/chevron-down.svg";
import { Link } from "react-router-dom";

class QuickLinks extends Component {
  constructor() {
    super();
    this.state = {
      showLinks: false
    };
  }

  showLinks() {
    this.setState({
      showLinks: !this.state.showLinks
    });
  }

  render() {
    const { showLinks } = this.state;
    return (
      <div>
        {/* <Header />
    <p>Contact</p> */}
        {!showLinks ? (
          <div className="quickLinksInfoBox" onClick={() => this.showLinks()}>
            <h3>Quick Links</h3>

            <img
              src={chevronUp}
              className="contactChevronBtn"
              alt="hideContact"
            />
          </div>
        ) : (
          <div>
            <div className="quickLinksInfoBox" onClick={() => this.showLinks()}>
              <h3>Quick Links</h3>
              <img
                src={chevronDown}
                className="contactChevronBtn"
                alt="showContact"
              />
            </div>
            <div className="contactDropdownInfoBox">
              <Link to="/" className="quickLinks">
                Home
              </Link>
              <Link to="/about" className="quickLinks">
                About
              </Link>
              {/* <Link to="/contact" className="quickLinks">
                Contact
              </Link> */}
              <Link to="/privacy" className="quickLinks">
                Privacy Notice
              </Link>
              <Link to="/disclaimer" className="quickLinks">
                Disclaimer
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default QuickLinks;
