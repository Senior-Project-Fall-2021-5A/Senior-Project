import React from "react";


const RegisterForm = ({ isShowLogin }) => {
  return (
    <div className={`${isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form>
            <h1 className="login-text">Sign Up</h1>
            <label>Email</label>
            <br></br>
            <input type="email" name="email" className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" name="password" className="login-box" />
            <br></br>
            <input type="submit" value="SUBMIT" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;