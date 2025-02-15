import "./ResetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (event) => {
    event.preventDefault();
    
    alert("A password reset link has been sent to " + email);
    navigate("/login");
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-title">Reset Your Password</h2>
      <form className="reset-form" onSubmit={handleReset}>
        <div className="input-group">
          <label className="input-label">Enter your registered email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="input-field" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="reset-button">Send Reset Link</button>
      </form>
      <p className="footer-text">Powered By ABCDEFGHIJK</p>
      <p className="footer-text">Copyright &copy; 2025 Academia. All rights reserved.</p>   
    </div>
  );
}
