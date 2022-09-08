import React, { useState } from "react";
import Auth from "../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Authentication() {
  const countryCode = "+91";

  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
          },
        },
        Auth
      );
  }

  const handlePhoneNumber = (e) => {
    console.log(e.target.value);
    setPhoneNumber(e.target.value);
  };

  const requestOTP = (e) => {
    console.log(phoneNumber);
    if (phoneNumber.length >= 12) {
      setExpandForm(true);
      generateReCaptcha();
      let appViewer = window.recaptchaVerifier;
      signInWithPhoneNumber(Auth, phoneNumber, appViewer)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log(error);
      });
    }
    e.preventDefault();
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if(otp.length === 6){
        let confirmationResult = window.confirmationResult;

        confirmationResult.confirm(otp).then((result) => {
            const user = result.user;
            console.log(user);
          }).catch((error) => {

          });
    }
  };

  return (
    <div className="container col-4">
      <div className="card mt-5">

        <div className="card-body">
          <form onSubmit={requestOTP}>
            <h3>Sign in</h3>
            <div className="mb-3">
              <label htmlFor="phoneNumberInput" className="form-label">Phone number</label>
              <input
                onChange={handlePhoneNumber}
                type="tel"
                className="form-control"
                id="phoneNumberInput"
                aria-describedby="emailHelp"
                value={phoneNumber}
              />
              <div id="phoneNumberHelp" className="form-text">Please enter your phone number</div>
            </div> 

            {expandForm === true ? (
              <>
                <div className="mb-3">
                  <label htmlFor="otpInput" className="form-label">
                    OTP
                  </label>
                  <input type="number" className="form-control" id="otpInput" val={OTP} onChange={verifyOTP} />
                  <div id="otpHelp" className="form-text">
                    Please enter the one time pin sent to your phone number
                  </div>
                </div>
              </>
            ) : null}

            {expandForm === false ? (
              <button type="submit"className="btn btn-primary">Request OTP</button>
            ) : null}

            <div id="recaptcha-container"></div>
          </form>
        </div>
      </div>
    </div>
  );
}
