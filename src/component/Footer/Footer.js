import React from "react";
import "./Footer.css";

import facebookIcon from "./FooterSvgs/facebook-square.svg";
import twitterIcon from "./FooterSvgs/twitter-square.svg";
import instagramIcon from "./FooterSvgs/icons8-instagram.svg";

const Footer = () => {
  return (
    <div>
      <div className="socialMediaAndPaymentContainer">
        <h3>Let's Get Connected</h3>
        <div className="socialMediaContainer">
          <a href="https://www.facebook.com/pages/Bugstuff/161305630557487">
            <img
              className="socialMediaImgs"
              src={facebookIcon}
              alt="facebook"
            />
          </a>
          <img className="socialMediaImgs" src={twitterIcon} alt="twitter" />
          <img className="instagramImgs" src={instagramIcon} alt="instagram" />
        </div>
      </div>
      <div className="copyrightAndPaymentContainer">
        <p className="copyrightTxt">
          © 2018 Bugstuff | Volkswagen Bug & VW Beetle Parts Web Design by Jarid
          Marinos
        </p>
        <div>
          <img
            src="http://www.bugstuffonline.com/templates/fallback/images/paypal.png"
            alt="payment methods"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
