import React, {Component} from "react";
import "./About.css";

import { connect } from "react-redux"
import { getHamburgerMenu } from '../../ducks/viewReducer';

import Footer from "../Footer/Footer";

class About extends Component {

  handleBurgers = () => {
    if (this.props.showHamburger) {
      this.props.getHamburgerMenu()
    }
  }

  render() {
    return (
      <div>
        <div className="aboutBg" onClick={this.handleBurgers}>
          <div>
            <div className="aboutContainer">
              <h3>Bugstuff's Story</h3>
              <p>
                The story of Bugstuff begins in the spring of 1969, when owner and
                founder Jack Rymarchyk opened a kit car magazine and read an article
                titled, "Change Your Volkswagen Bug into a Ford GT Style Sports Car in
                One Weekend."
              </p>
              <p>
                Jack thought the idea sounded great, and so he got to work, armed only
                with a set of metric tools and basic automotive knowledge and the help
                of his father, a mechanic and bodyman. A summer of working at the nearby
                steel mill provided the necessary funds, which were saved up to make the
                purchase.
              </p>
              <p>
                By this point, Jack's life had changed as he was attending college, with
                plans to marry. Around this time, Jack was asked by a classmate to
                change the rear brakes on his Volkswagen Bug. He did the job for 50
                cents, and this essentially marked Bugstuff's birth.
              </p>
              <p>
                Bugstuff began in a small college town, and most of the students were
                driving economical Volkswagens, meaning a large customer base. Word soon
                spread to a small West Brownsville, Pa. grange, which was the hub in the
                local areas for Volkswagen repairs. Jack focused on taking care of the
                needs of the customers with good prices and outstanding service.
                Business was very good, and Jack was able to work his way through
                college. Upon graduation, the business had grown to the point that Jack
                was able to make his part-time job a full-time profession.
              </p>
              <p>
                In addition to his foray into automobiles repairs, Jack always had an
                interest in racing and in the early 1970s, he built a Manx-style drag
                buggy racing throughout the Northeast. He won the East Coast
                Championship in the fall of 1972, and racing continued to be a driving
                force for Bugstuff. To keep the business going, Jack started to develop
                new and innovative products.
              </p>
              <p>
                The repair business continued to succeed, but experienced a small
                setback in the 1980s when Jack was suffered a severe hand injury. As the
                hand's use was in question, Jack put his efforts into selling Volkswagen
                parts. There was demand for off-road tube chassis' and fiberglass seats,
                but not an adequate supply. Jack made the decision to manufacture his
                own line of tubing products under the name "Glassworks Fiberglass." This
                new venture grew rapidly, making over 300 parts, including a one-piece
                fiberglass Bug body, as well as a Bug drag racing tubular chassis, baja
                kits and fiberglass seat shells. Jack supplied these products to East
                Coast wholesale and retails accounts including Warshowsky and JC
                Whitney.
              </p>
              <p>
                Jack's main focus has and always will be to give the customer the best
                service and selection of Volkswagen-related products. Bugstuff is able
                to do this by providing a toll-free 1-800 number, and now a Web Store.
                If you call to place your order, you will more than likely get Jack on
                the phone. With over 40 years of experience, he will give you
                knowledgeable, quick, courteous service to which you are accustomed.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
};

const mapStateToProps = state => ({ ...state.viewReducer });

export default connect(mapStateToProps, { getHamburgerMenu })(About);
