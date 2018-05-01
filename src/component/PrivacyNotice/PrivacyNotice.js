import React, {Component} from "react";
import "./PrivacyNotice.css";

import { connect } from "react-redux"

import { getHamburgerMenu } from '../../ducks/viewReducer';


class PrivacyNotice extends Component {

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  render() {
    return (
  <div className="privacyBg" onClick={this.handleBurgers}>
    <div>
      <div className="privacyContainer">
        <h3>Privacy Notice</h3>
        <h4>Personal identification information</h4>
        <p>
          We may collect personal identification information from Users in a
          variety of ways, including, but not limited to, when Users visit our
          site, register on the site, place an order, subscribe to the newsletter,
          fill out a form, and in connection with other activities, services,
          features or resources we make available on our Site. Users may be asked
          for, as appropriate, name, email address, mailing address, phone number,
          credit card information. Users may, however, visit our Site anonymously.
          We will collect personal identification information from Users only if
          they voluntarily submit such information to us. Users can always refuse
          to supply personally identification information, except that it may
          prevent them from engaging in certain Site related activities.
        </p>
        <h4>Web browser cookies</h4>
        <p>
          Our Site may use "cookies" to enhance User experience. User's web
          browser places cookies on their hard drive for record-keeping purposes
          and sometimes to track information about them. User may choose to set
          their web browser to refuse cookies, or to alert you when cookies are
          being sent. If they do so, note that some parts of the Site may not
          function properly.
        </p>
        <h4>How we protect your information</h4>
        <p>
          We adopt appropriate data collection, storage and processing practices
          and security measures to protect against unauthorized access,
          alteration, disclosure or destruction of your personal information,
          username, password, transaction information and data stored on our Site.
        </p>
        <h4>Your acceptance of these terms</h4>
        <p>
          By using this Site, you signify your acceptance of this policy. If you
          do not agree to this policy, please do not use our Site. Your continued
          use of the Site following the posting of changes to this policy will be
          deemed your acceptance of those changes.
        </p>
      </div>
    </div>
  </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.viewReducer });

export default connect(mapStateToProps, { getHamburgerMenu })(PrivacyNotice);
