import React, { useState } from "react";
import Auth, { db } from "../../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import "../../styles/login.css";
import logo from "../../imgs/logo.png";

export default function Authentication() {
  const countryCode = "+91 ";
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => { },
      },
      Auth
    );
  };

  const handlePhoneNumber = (e) => {
    console.log(e.target.value);
    setPhoneNumber(e.target.value);
  };

  const requestOTP = (e) => {
    console.log(phoneNumber);

    if (phoneNumber.length >= 12) {

      async function checkDatabase() {
        const docRef = doc(db, "users", phoneNumber);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setExpandForm(true);
          generateReCaptcha();
          let appViewer = window.recaptchaVerifier;
          signInWithPhoneNumber(Auth, phoneNumber, appViewer)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("No such document!");
          navigate('/signup', {
            state: { phoneNumber: phoneNumber },
          });
        }
      }

      checkDatabase();
    }
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
        .catch((error) => { });
    }
  };

  return (
    <div className="body_login">
      <div></div>
      <div className="container col-lg-4 padding-fix">
        <div className="card mt-5 h-100 flex flex-col justify-content-center align-items-center rounded-4">
          <img src={logo} className="logo_medbase_login" alt="MedBase Logo" />
          <div className="card-body my-3">
            <form onSubmit={requestOTP}>
              <h3 className="text-center">Welcome to Medbase</h3>
              <div className="mb-3">
                <label htmlFor="phoneNumberInput" className="form-label">
                  Phone number
                </label>
                <input
                  onChange={handlePhoneNumber}
                  type="tel"
                  className="form-control"
                  id="phoneNumberInput"
                  aria-describedby="emailHelp"
                  value={phoneNumber}
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
                <button type="submit" className="btn btn-primary">
                  Continue
                </button>
              ) : null}

              <div id="recaptcha-container"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
