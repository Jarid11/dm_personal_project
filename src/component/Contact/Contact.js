import React, { Component } from "react";
import "./Contact.css";

import MapContainer from "../MapContainer/MapContainer";

import chevronUp from "./ChevronImgs/chevron-up.svg";
import chevronDown from "./ChevronImgs/chevron-down.svg";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContact: false
    };
  }

  showContact() {
    this.setState({
      showContact: !this.state.showContact
    });
  }

  render() {
    const { showContact } = this.state;
    return (
      <div className="contactWrapper">
        {!showContact ? (
          <div className="contactInfoBox" onClick={() => this.showContact()}>
            <h3>Contact Us</h3>

            <img
              src={chevronUp}
              className="contactChevronBtn"
              alt="hideContact"
            />
          </div>
        ) : (
          <div>
            <div className="contactInfoBox" onClick={() => this.showContact()}>
              <h3>Contact Us</h3>
              <img
                src={chevronDown}
                className="contactChevronBtn"
                alt="showContact"
              />
            </div>
            <div className="contactDropdownInfoBox">
              <div className="googleMapContainer">
                <MapContainer />
              </div>
              <p className="contactStreetAddress">709 Jefferson Ave</p>
              <p className="contactCityStateZip">Brownsville, PA 15417</p>
              <p>(724) 785-7000</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Contact;
