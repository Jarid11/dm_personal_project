import React, {Component} from "react";


import { connect } from "react-redux"

import { getHamburgerMenu } from '../../ducks/viewReducer';

class Events extends Component {

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  render() {
    return (
  <div onClick={this.handleBurgers}>
    <p>Events</p>
  </div>
  )
  }
}

const mapStateToProps = state => ({ ...state.viewReducer });

export default connect(mapStateToProps, { getHamburgerMenu })(Events);
