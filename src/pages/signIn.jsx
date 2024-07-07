import React, { useState } from "react";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import "./signInStyles.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    // Mock authentication logic
    if (email === "example@gmail.com" && password === "password123") {
      setAuthenticated(true);
      // Redirect or perform actions after successful sign-in
      // You can use React Router for navigation or any other method
    } else {
      setAuthenticated(false);
      console.error("Sign In Error: Invalid credentials");
      // Handle errors (show error message, redirect, etc.)
    }
  };

  const handleSignOut = () => {
    setAuthenticated(false);
    // Additional logic for sign-out if needed
  };
  const handleBack = () => {
    navigate("/"); // Go back to the previous page
  };

  return (
    <div className="sign">
      <Navbar />
      <div className="sign-in-container">
        {!authenticated ? (
          <>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <label>Email:</label>
              <DropdownList
                data={["example@gmail.com"]}
                value={email}
                onChange={(value) => setEmail(value)}
                placeholder="Select an email"
              />
              <label>Password:</label>
              <input
                className="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgotDiv">
                <p className="forgotPw">Forgot Password ?</p>
              </div>
              <button className="sign-in-but" type="submit">
                Sign In
              </button>
            </form>
            <div className="otherOptions">
              <div className="hrLine">
                <div className="separator">or</div>
              </div>

              <div className="socialMedia">
                <div className="facebook">
                  <a href="https://web.facebook.com/login.php?_rdc=1&_rdr">
                    {" "}
                    <button type="button" className="btn btn-primary">
                      {"  "}
                      <i className="fab fa-facebook-f"></i> Continue with
                      Facebook
                    </button>
                  </a>
                </div>
                <div className="google">
                  <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2F&followup=https%3A%2F%2Faccounts.google.com%2F&ifkv=ASKXGp3FopZZ60s-jZf0l-0uEcb9SDoSXhAUCdbjHGCbhIRhI4yhV1QIJCrZK9haZJg2XtPwVX3w&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-503265638%3A1703917664142065&theme=glif">
                    <button type="button" className="btn btn-outline-dark">
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-256.png"
                        alt=""
                      />{" "}
                      Continue with Google
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>Welcome, User!</h2>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )}
      </div>
      <div className="noAccount">
        Don't have an account? <Link to="/signUp"> Sign Up</Link>
      </div>
      <div className="goBack" onClick={handleBack}>
        <p>Back</p>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
