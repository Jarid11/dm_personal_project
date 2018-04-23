import React from "react";
import "./Manufacturers.css";

import bugpack from "./ManufacturerImgs/bugpack.jpg";
import chassis from "./ManufacturerImgs/chassis.jpg";
import empi from "./ManufacturerImgs/empi.jpg";
import glasworx from "./ManufacturerImgs/glasworx.jpg";
import pertronix from "./ManufacturerImgs/pertronix.jpg";
import scat from "./ManufacturerImgs/scat.jpg";
import tmi from "./ManufacturerImgs/tmi.jpg";

const Manufacturers = () => {
  return (
    <div className="manufacturersContainer">
      <div className="manufacturersTxtContainer">
        <h3 className="manufacturersTxt">Manufacturer's</h3>
      </div>
      <div className="manufacturersImgContainer">
        <div>
          <img src={bugpack} />
        </div>
        <div>
          <img src={empi} />
        </div>
        <div>
          <img src={tmi} />
        </div>
        <div>
          <img src={scat} />
        </div>
        <div>
          <img src={pertronix} />
        </div>
        <div>
          <img src={chassis} />
        </div>
        <div>
          <img src={glasworx} />
        </div>
      </div>
    </div>
  );
};

export default Manufacturers;
