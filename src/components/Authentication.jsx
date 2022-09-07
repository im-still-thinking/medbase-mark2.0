import React, { useState } from "react";
import Auth from "../firebase-config";
import { RecaptchaVerifier } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Authentication() {
  const countryCode = "+91";

  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);

  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setExpandForm(true);
      window.recaptchaVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        Auth
      );
    }
  };

  return (
    <div className="container">
      <div className="card card-body mt-5">
        <form onSubmit={requestOTP}>
          <h2>Sign in with phone number</h2>
          <div className="mb-3">
            <label htmlFor="phoneNumberInput" className="form-label">
              Phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumberInput"
              aria-describedby="emailHelp"
            />
            <div id="phoneNumberHelp" className="form-text">
              Please enter your phone number
            </div>
          </div>
          {expandForm === true ? (
            <>
              <div className="mb-3">
                <label htmlFor="otpInput" className="form-label">
                  OTP
                </label>
                <input type="number" className="form-control" id="otpInput" />
                <div id="otpHelp" className="form-text">
                  Please enter the one time pin sent to your phone number
                </div>
              </div>
            </>
          ) : null}
          {expandForm === false ? (
            <button className="btn btn-primary">Request OTP</button>
          ) : null}
          <div id="recaptcha-container"></div>
        </form>
      </div>
    </div>
  );
}
