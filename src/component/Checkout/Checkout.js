import React, { Component } from "react";
import "./Checkout.css";

import Header from "../Header/Header";
import cartIcon from "../Header/HeaderSvgs/shopping-cart.svg";
import checkIcon from "./check.svg";
import truckIcon from "./truck.svg";

import StripeCheckout from "../StripeCheckout/StripeCheckout";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, addShippingInfo } from "../../ducks/userReducer";
import {
  getCart,
  getTotalItems,
  getGrandTotal,
  getCartImgs
} from "../../ducks/cartReducer";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      step1: true,
      step2: false,
      step3: false,
      standardShip: 7.99,
      expressShip: 15.99,
      shipCost: 7.99,
      shipDate: 7,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      streetAddress: "",
      extraAddressInfo: "",
      city: "",
      state: "",
      zip: ""
    };
    this.handleSteps = this.handleSteps.bind(this);
    this.handleStandardShip = this.handleStandardShip.bind(this);
    this.handleExpressShip = this.handleExpressShip.bind(this);
    this.handleAddInfo = this.handleAddInfo.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getCart();
    this.props.getTotalItems();
    this.props.getGrandTotal();
    this.props.getCartImgs();
  }

  handleSteps() {
    this.setState({
      step1: !this.state.step1,
      step2: !this.state.step2
    });
  }

  handleStep2() {
    this.setState({
      step2: !this.state.step2
    });
  }

  handleStandardShip() {
    this.setState({
      shipCost: this.state.standardShip,
      shipDate: 7
    });
  }

  handleExpressShip() {
    this.setState({
      shipCost: this.state.expressShip,
      shipDate: 3
    });
  }

  handleAddInfo(fn, ln, pn, e, sa, eai, c, z) {
    this.props
      .addShippinInfo(fn, ln, pn, e, sa, eai, c, z)
      .then(() => this.props.getUser());
  }

  handleInputs(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  render() {
    const {
      step1,
      step2,
      step3,
      standardShip,
      expressShip,
      shipCost,
      shipDate,
      firstName,
      lastName,
      phoneNumber,
      email,
      streetAddress,
      extraAddressInfo,
      city,
      state,
      zip
    } = this.state;
    const { cart, totalItems, grandTotal, cartImgs } = this.props;

    let estDate = new Date();
    estDate.setDate(estDate.getDate() + shipDate);
    const subTotal = grandTotal.toFixed(2);
    const tax = (grandTotal.toFixed(2) * 0.06).toFixed(2);
    const total = Number(subTotal) + Number(tax) + Number(shipCost);

    const cartImgList = cartImgs.map((e, i) => {
      return (
        <div className="imgBoxes" key={i}>
          <img className="itemImgContainer" src={e.img} alt="items" />
        </div>
      );
    });

    return (
      <div>
        <Header />
        {step1 ? (
          <div>
            <div className="checkoutContainer">
              <div className="step1Box">
                <div className="stepNumBox">
                  <p>1</p>
                </div>
                <h3>Shipping Cost</h3>
              </div>
              <div className="shippingOptsContainer">
                <button
                  className="shippingBtns"
                  onClick={this.handleStandardShip}
                >
                  Standard Shipping
                </button>
                <button
                  className="shippingBtns"
                  onClick={this.handleExpressShip}
                >
                  Express Shipping
                </button>
              </div>
              <div className="arrivalContainer">
                <h4>Arrive by</h4>
                <div className="arrivalBox">
                  <h5>
                    {`${new Date().getMonth() + 1} /
                  ${new Date().getDate() + shipDate} /
                  ${new Date().getYear() - 100}`}
                  </h5>
                  <h5>{shipCost}</h5>
                </div>
              </div>

              <div className="cartImgContainer">{cartImgList}</div>

              <div className="totalContainer">
                <div className="subtotalBox">
                  <h5>Subtotal ({totalItems} items )</h5>
                  <h5>${subTotal}</h5>
                </div>
                <div className="shippingBox">
                  <h5>Shipping</h5>
                  <h5>${shipCost}</h5>
                </div>
                <div className="taxesBox">
                  <h5>{`Est. Taxes & fees`}</h5>
                  <h5>${tax}</h5>
                </div>
                <div className="totalBox">
                  <h4>Est. total</h4>
                  <h4>${total.toFixed(2)}</h4>
                </div>
                <div className="itemDropdown">
                  <h5>See item details +</h5>
                </div>
              </div>
            </div>
            <div className="disabledStep2Container">
              <div className="disabledStepNumBox">
                <p>2</p>
              </div>
              <h3 className="disabledStepsTitles">Enter shipping address</h3>
            </div>
            <div className="disabledStep3Container">
              <div className="disabledStepNumBox">
                <p>3</p>
              </div>
              <h3 className="disabledStepsTitles">Enter payment method</h3>
            </div>
          </div>
        ) : (
          <div className="shrinkedStepContainer">
            <div className="checkAndShipContainer">
              <div className="checkMarkContainer">
                <img className="checkMarkIcon" src={checkIcon} alt="check" />
                <img className="truckIcon" src={truckIcon} alt="truck" />
                <h4>Shipping</h4>
              </div>
              <div className="shrinkedEditBtnContainer">
                <button className="shrinkedEditBtn" onClick={this.handleSteps}>
                  Edit
                </button>
              </div>
            </div>
            <div className="shrinkedCartImgContainer">{cartImgList}</div>
            <div className="shrinkedArrivalContainer">
              <h5>Arrive by</h5>
              <h5 className="shrinkedDate">
                {estDate
                  .toString()
                  .split(" ")
                  .splice(0, 3)
                  .join(" ")}
              </h5>
            </div>
          </div>
        )}

        <div
          className="step2Container"
          style={{ display: step1 ? "none" : "block" }}
        >
          {step2 ? (
            <div>
              <div className="step2InputBoxes">
                <div className="step2Box">
                  <div className="stepNumBox">
                    <p>2</p>
                  </div>
                  <h4>Confirm shipping address</h4>
                </div>
                <div>
                  <div className="inputBoxes">
                    <h5 className="inputTitles">First Name</h5>
                    <input
                      className="step2Inputs"
                      onChange={e =>
                        this.handleInputs("firstName", e.target.value)
                      }
                      value={firstName}
                      type="text"
                      required
                    />
                  </div>
                  <div className="inputBoxes">
                    <h5 className="inputTitles">Last Name</h5>
                    <input
                      className="step2Inputs"
                      onChange={e =>
                        this.handleInputs("lastName", e.target.value)
                      }
                      value={lastName}
                      type="text"
                      required
                    />
                  </div>
                  <div className="inputBoxes">
                    <h5 className="inputTitles">Phone Number</h5>
                    <input
                      className="step2Inputs"
                      onChange={e =>
                        this.handleInputs("phoneNumber", e.target.value)
                      }
                      value={phoneNumber}
                      type="tel"
                      required
                      pattern="[0-9]{3}[ -][0-9]{3}[ -][0-9]{4}"
                    />
                  </div>
                  <div className="inputBoxes">
                    <h5 className="inputTitles">
                      Email address for order notification
                    </h5>
                    <input
                      className="step2Inputs"
                      onChange={e => this.handleInputs("email", e.target.value)}
                      value={email}
                      type="email"
                      required
                    />
                  </div>
                  <div className="inputBoxes">
                    <h5 className="inputTitles">Street address</h5>
                    <input
                      className="step2Inputs"
                      onChange={e =>
                        this.handleInputs("streetAddress", e.target.value)
                      }
                      value={streetAddress}
                      type="text"
                      required
                    />
                  </div>
                  <div className="inputBoxes">
                    <h5 className="inputTitles">Apt, suite, etc (optional)</h5>
                    <input
                      className="step2Inputs"
                      onChange={e =>
                        this.handleInputs("extraAddressInfo", e.target.value)
                      }
                      value={extraAddressInfo}
                      type="text"
                    />
                  </div>
                  <div className="inputBoxes">
                    <h5 className="inputTitles">City</h5>
                    <input
                      className="step2Inputs"
                      onChange={e => this.handleInputs("city", e.target.value)}
                      value={city}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="stateAndZipContainer">
                  <div className="inputBoxes stateInputBox">
                    <h5 className="inputTitles">State</h5>
                    <select
                      className="stateInput"
                      onChange={e => this.handleInputs("state", e.target.value)}
                      name="state"
                      value={state}
                    >
                      <option value="">Select a State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                  <div className="inputBoxes zipInputBox">
                    <h5 className="inputTitles">ZIP Code</h5>
                    <input
                      className="step2Inputs zipInput"
                      onChange={e => this.handleInputs("zip", e.target.value)}
                      value={zip}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="totalContainer">
                  <div className="subtotalBox">
                    <h5>Subtotal ({totalItems} items )</h5>
                    <h5>${subTotal}</h5>
                  </div>
                  <div className="shippingBox">
                    <h5>Shipping</h5>
                    <h5>${shipCost}</h5>
                  </div>
                  <div className="taxesBox">
                    <h5>{`Est. Taxes & fees`}</h5>
                    <h5>${tax}</h5>
                  </div>
                  <div className="totalBox">
                    <h4>Est. total</h4>
                    <h4>${total.toFixed(2)}</h4>
                  </div>
                  <div className="itemDropdown">
                    <h5>See item details +</h5>
                  </div>
                </div>
              </div>
              <div className="disabledStep3Container4Step2">
                <div className="disabledStepNumBox">
                  <p>3</p>
                </div>
                <h3 className="disabledStepsTitles">Enter payment method</h3>
              </div>
            </div>
          ) : (
            <div>
              <div className="shrinkedStepContainer">
                <div className="checkAndShipContainer">
                  <div className="checkMarkContainer2">
                    <img
                      className="checkMarkIcon"
                      src={checkIcon}
                      alt="check"
                    />
                    {/* <img className="truckIcon" src={truckIcon} alt="truck" /> */}
                    <h4>Sending to</h4>
                  </div>
                  <div className="shrinkedEditBtnContainer">
                    <button
                      className="shrinkedEditBtn"
                      onClick={() => this.handleStep2()}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div>
                  <h5 className="shrinkedStep2FirstName">{`${
                    this.state.firstName
                  } ${this.state.lastName}`}</h5>
                  <h5>{`${this.state.streetAddress}`}</h5>
                  {this.state.extraAddressInfo ? (
                    <h5>{`${this.state.extraAddressInfo}`}</h5>
                  ) : null}
                  <h5>{`${this.state.city}, ${this.state.state}, ${
                    this.state.zip
                  }`}</h5>
                  <h5>{`${this.state.email}`}</h5>
                </div>
              </div>
              <div className="disabledStep3Container4Step2">
                <div className="disabledStepNumBox">
                  <p>3</p>
                </div>
                <h3 className="disabledStepsTitles">Enter payment method</h3>
              </div>
            </div>
          )}
        </div>

        <footer className="checkoutFooter">
          {this.state.zip && !step1 && !step2 ? (
            <StripeCheckout
              name={`Bugstuff`}
              description={`${this.state.firstName}'s order`}
              amount={total}
              dataEmail={this.state.email}
            />
          ) : this.state.zip && !step1 ? (
            <button className="contBtn" onClick={() => this.handleStep2()}>
              Review Order
            </button>
          ) : (
            <button className="contBtn" onClick={() => this.handleSteps()}>
              Continue
            </button>
          )}
          <div className="footerTotBox">
            <h5 className="footerTotText"> Est. total</h5>
            <h4 className="footerTotAmount">{total.toFixed(2)}</h4>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
  ...state.cartReducer
});

export default connect(mapStateToProps, {
  getUser,
  getCart,
  getTotalItems,
  getGrandTotal,
  getCartImgs,
  addShippingInfo
})(Checkout);
