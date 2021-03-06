import React, {Component} from "react";
import "./Disclaimer.css";

import { connect } from "react-redux"

import { getHamburgerMenu } from '../../ducks/viewReducer';

import Footer from "../Footer/Footer";

class Disclaimer extends Component {

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  render() {
    return (
  <div>
    <div className="disclaimerBg" onClick={this.handleBurgers}>
      <div>
        <div className="disclaimerContainer">
          <h3>Disclaimer</h3>
          <p>
            This site is fictional and a demo, the information contained in this
            website is for general information and learning purposes only. The
            information is provided by BugStuff and while we endeavour to keep the
            information up to date and correct, we make no representations or
            warranties of any kind, express or implied, about the completeness,
            accuracy, reliability, suitability or availability with respect to the
            website or the information, products, services, or related graphics
            contained on the website for any purpose. Any reliance you place on such
            information is therefore strictly at your own risk.
          </p>
          <p>
            In no event will we be liable for any loss or damage including without
            limitation, indirect or consequential loss or damage, or any loss or
            damage whatsoever arising from loss of data or profits arising out of,
            or in connection with, the use of this website.
          </p>
          <p>
            Through this website you are able to link to other websites which are
            not under the control of BugStuff. We have no control over the nature,
            content and availability of those sites. The inclusion of any links does
            not necessarily imply a recommendation or endorse the views expressed
            within them.
          </p>
          <p>
            Every effort is made to keep the website up and running smoothly.
            However, BugStuff takes no responsibility for, and will not be liable
            for, the website being temporarily unavailable due to technical issues
            beyond our control.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.viewReducer });

export default connect(mapStateToProps, { getHamburgerMenu })(Disclaimer);
