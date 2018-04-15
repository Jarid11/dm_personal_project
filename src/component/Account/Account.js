import React from "react";

import Header from "../Header/Header";

const Account = () => (
  <div>
    <Header />
    <a href={process.env.REACT_APP_LOGIN}>
      <button>Login</button>
    </a>
    <p>Account</p>
  </div>
);

export default Account;
