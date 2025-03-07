import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login } from "../../Api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));
  if (user) {
    window.location.href = "/";
  }

  const [data, setData] = useState({
    userID: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(data);
      console.log(response);
      if (response.status === "no user found") {
        alert("No User Found With This ID");
      } else if (response.status === "Wrong Password") {
        alert("Wrong Password");
      } else {
        localStorage.setItem("userData", JSON.stringify(response));
        navigate("/");
      }
    } catch (error) {
      alert("Some error has occurred. Please try again later");
      console.log(error);
    }
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    navigate("/reset-password");
  };

  return (
    <div className="login-container">
      <div className="illustration-container">
        <img src="\src\assets\illus.png" className="illustration" />
      </div>

      <div className="login-form-container">
        <h2 className="login-title">Log in with your Institutional ID</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Institutional ID</label>
            <input
              type="text"
              name="userID"
              placeholder="Enter your Institutional ID"
              className="login-input-field"
              onChange={changeHandler}
              value={data.userID || ""}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="login-input-field"
              onChange={changeHandler}
              value={data.password || ""}
            />
          </div>

          <button type="submit" className="login-button">
            Log in
          </button>
          

          <div className="forgot-password">
            <a href="#" onClick={handleForgotPassword}>
              Forgot password?
            </a>
          </div>
        </form>

        <div className="login-footer-text">
          <p >Powered By MOAB</p>
            <p>
          Copyright &copy; 2025 Academia. All rights reserved.
          </p>
        </div>

        
        
      </div>
    </div>
  );
}
