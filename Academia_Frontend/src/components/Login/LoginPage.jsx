import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login } from "../../Api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Id: "",
    Password: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(data);
      console.log(response);
      if (response.status === "failed") {
        alert("Login Failed");
      } else {
        localStorage.setItem("userData", JSON.stringify(response));
        navigate("/");
      }
    } catch (error) {
      alert("Some error has occurred. Please try again later");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="illustration-container">
        {/* <img src={require("")} alt="E-learning Illustration" className="illustration" /> */}
      </div>

      <div className="login-form-container">
        <h2 className="login-title">Log in with your Institutional ID</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Institutional ID</label>
            <input
              type="text"
              name="Id"
              placeholder="Enter your Institutional ID"
              className="input-field"
              onChange={changeHandler}
              value={data.Id || ""}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              className="input-field"
              onChange={changeHandler}
              value={data.Password || ""}
            />
          </div>

          <button type="submit" className="login-button">
            Log in
          </button>

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
        </form>

        <p className="footer-text">Powered By MOAB</p>
        <p className="footer-text">
          Copyright &copy; 2025 Academia. All rights reserved.
        </p>
      </div>
    </div>
  );
}
