import "bootstrap/dist/css/bootstrap.min.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import auth, { db } from "../../firebase-config";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../imgs/logo.png";


export default function SignUp() {
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const { state } = useLocation();
  const { phoneNumber } = state;
  const navigate  = useNavigate();

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const getOtp = (e) => {
    console.log(e.target[1].value);
    console.log(phoneNumber);

    async function createData() {
      await setDoc(doc(db, "users", phoneNumber), {
        name: e.target[0].value,
        age: e.target[1].value,
        gender: e.target[2].value,
        cid: [],
      });
    }

    setExpandForm(true);
    generateReCaptcha();
    let appViewer = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appViewer)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });

    createData();
    e.preventDefault();
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;

      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          console.log(user);
          navigate('/dashboard');
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="Auth-form-container container">
      <form
        className="Auth-form shadow-lg p-3 my-5 bg-white rounded"
        onSubmit={getOtp}
      >
        <div className="Auth-form-content card_signup">
        <img src={logo} className="logo_medbase_signup" alt="MedBase Logo" />
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="forms">

          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Your Name"
            />
          </div>

          <div className="form-group mt-3">
            <label>Age</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Your Age"
            />
          </div>

          <div className="form-group mt-3 px-3">
            <label htmlFor="exampleFormControlSelect1">Gender</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
              <option>Prefer Not to Say</option>
            </select>
          </div>
          </div>
          

          {expandForm === true ? (
            <>
              <div className="mb-3 mt-3">
                <label htmlFor="otpInput" className="form-label">
                  OTP
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="otpInput"
                  val={OTP}
                  onChange={verifyOTP}
                />
                <div id="otpHelp" className="form-text">
                  Please enter the one time pin sent to your phone number
                </div>
              </div>
            </>
          ) : null}

          {expandForm === false ? (
            <div className="d-grid gap-2 mt-3 pb-3">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>
          ) : null}
        </div>

        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
}
