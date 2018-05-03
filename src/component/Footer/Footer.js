import React from "react";
import "./Footer.css";
import "font-awesome/css/font-awesome.min.css"

import MapContainer from "../MapContainer/MapContainer";

import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div>
      {/* Mobile View Footer */}
      <div className="footerWrapper" >
        <div className="socialMediaAndPaymentContainer">
          <h3>Let's Get Connected</h3>
          <div className="socialMediaContainer">
            <a href="https://www.facebook.com/pages/Bugstuff/161305630557487">
              <i className="fa fa-facebook mobileMedia"></i>
            </a>
            <i className="fa fa-twitter mobileMedia"></i>
            <i className="fa fa-instagram mobileMedia"></i>
          </div>
        </div>
        <div className="copyrightAndPaymentContainer">
          <p className="footerTxt">THIS SITE IS FICTIONAL AND MADE ONLY FOR DEMONSTRATION AND LEARNING PURPOSES</p>
          <p className="footerTxt">
            © 2018 Bugstuff | Volkswagen Bug & VW Beetle Parts Web Design by Jarid
            Marinos
          </p>
          <div className="paymentContainer">
            <i className="fa fa-cc-visa"></i>
            <i className="fa fa-cc-mastercard"></i>
            <i className="fa fa-cc-discover"></i>
            <i className="fa fa-cc-paypal"></i>
          </div>
        </div>
      </div>
      {/* Web Footer View */}
      <div className="footerContactAndSocialMediaBg">
        <div className="footerContactWrapper">
          <div className="contactDropdownInfoWrapper">
            <h3>Contact Us</h3>
            <div className="googleMapContainer">
              <MapContainer />
            </div>
            <p className="contactStreetAddress">709 Jefferson Ave</p>
            <p className="contactCityStateZip">Brownsville, PA 15417</p>
            <p>(724) 785-7000</p>
          </div>
        </div>
        <div className="socialMediaAndPaymentWrapper">
          <div>
            <h3>Let's Get Connected</h3>
              <div className="socialMediaWrapper">
                <a href="https://www.facebook.com/pages/Bugstuff/161305630557487">
                  <i className="fa fa-facebook media"></i>
                </a>
                <i className="fa fa-twitter media"></i>
                <i className="fa fa-instagram media"></i>
              </div>
          </div>
        </div>
        <div className="quickLinksContainer">
          <h3>Quick Links</h3>
          <Link to="/" className="footerLinks">  
            <div className="quickLinkText">Home</div>
          </Link>
          <Link to="/about" className="footerLinks">  
            <div className="quickLinkText">Our Story</div>
          </Link>
          <Link to="/privacy" className="footerLinks">  
            <div className="quickLinkText">Privacy Notice</div>
          </Link>
          <Link to="/disclaimer"className="footerLinks">  
            <div>Disclaimer</div>
          </Link>
        </div>
        <div>
          <p className="copyrightTxt">THIS SITE IS FICTIONAL AND MADE ONLY FOR DEMONSTRATION AND LEARNING PURPOSES</p>
          <div className="copyrightAndPaymentWrapper">
            <p className="copyrightTxt">
              © 2018 Bugstuff | Volkswagen Bug & VW Beetle Parts Web Design by Jarid
              Marinos
            </p>
          </div>
          <div className="paymentWrapper">
                <i className="fa fa-cc-visa"></i>
                <i className="fa fa-cc-mastercard"></i>
                <i className="fa fa-cc-discover"></i>
                <i className="fa fa-cc-paypal"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
