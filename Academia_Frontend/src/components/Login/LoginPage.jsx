import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleForgotPassword = (event) => {
    event.preventDefault();
    navigate("/reset-password");
  };

  return (
    <div className="login-container">
      <div className="illustration-container"> 
        
      </div>
      
      <div className="login-form-container">
        <h2 className="login-title">Log in with your Institutional ID</h2>
        <form className="login-form">
          <div className="input-group">
            <label className="input-label">Institutional ID</label>
            <input type="text" placeholder="Enter your Institutional ID" className="input-field" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" placeholder="Enter your password" className="input-field" />
          </div>
          <button type="submit" className="login-button">Log in</button>
          <div className="forgot-password">
            <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
          </div>
        </form>
        <p className="footer-text">Powered By ABCDEFGHIJK</p>
        <p className="footer-text">Copyright &copy; 2025 Academia. All rights reserved.</p>   
      </div>
    </div>
  );
}
