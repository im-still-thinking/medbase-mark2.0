import React, {useState} from 'react';
import Auth from '../firebase-config';
import { RecaptchaVerifier } from "firebase/auth";

function authentication(){
    const countryCode = "+91";

    const [phoneNumber, setPhoneNumber] = useState(countryCode);
    const [expandForm, setExpandForm] = useState(false);

    const requestOTP = (e) => {
        e.preventDefault();
        if(phoneNumber.length >= 10){
            setExpandForm(true);
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
              }, Auth);
        }
    }

    
    
    return (
        <div >

        </div>
    );
}