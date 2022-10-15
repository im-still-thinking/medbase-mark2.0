import React from "react";
import sayak from "../../src/imgs/sayak.png";
import risav from "../../src/imgs/risav.png";
import raihan from "../../src/imgs/raihan.png";
import aritra from "../../src/imgs/aritra.png";
import one from "../../src/imgs/1.png";
import three from "../../src/imgs/3.png";
import thirteen from "../../src/imgs/13.png";
import logo2 from "../../src/imgs/MedBase.png";
import logo from "../../src/imgs/logo.png";
import { Link } from "react-router-dom";
// if (window?.location.pathname === '/')
//     require('../styless.css')
import "../styles/styless.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Landing() {
  return (
    <div className="body">
      <div className="navbar2">
        <center>
          <img src={logo} alt="logo" className="navbarp" />
        </center>
      </div>
      <div className="shape1"></div>
      <div className="shape2"></div>
      <div className="shape3"></div>
      <div className="shape4"></div>
      <div className="shape5"></div>
      <div className="shape6"></div>
      <div className="land_bg">
        <div className="card_land">
          <img src={logo2} alt="logo" className="logo_medbase_land" />
          <h1 className="h1">
            <span className="span">Med</span>Base
          </h1>
          <h3 className="h3">
            Medical records <b className="any">ANYTIME</b>{" "}
            <b className="any1">ANYWHERE!</b>
          </h3>
          <Link to="/auth">
            <button className="button">Join Us</button>
          </Link>
        </div>
      </div>
      <div className="about">

        <h2 className="h2">
          <center>About Us</center>
        </h2>
        <div className="about_us_phone">
          <p className="para_phone">
            MedBase is an online platform to maintain medical records of a
            patient. It runs on the IPFS - InterPlanetary File System protocol
            making it accessible even from a different planet! It's website form
            allows all users to use our services irrespective of the device they
            are using.
            <br/>
            <br/>
            Every registered user gets a unique 12 digit generated ID which can
            be used for accessing all the medical records of the person from
            birth till date from anywhere across the globe.
            <br/>
            <br/>
            Once uploaded the document cannot be removed: This ensures that a
            document cannot be duplicated but demands utmost caution of the
            uploader before uploading any document.
          </p>
        </div>
        <div className="about_us div1">
          <p className="p fp">
            MedBase is an online platform to maintain medical records of a
            patient. It runs on the IPFS - InterPlanetary File System protocol
            making it accessible even from a different planet! It's website form
            allows all users to use our services irrespective of the device they
            are using.
          </p>
          <img src={one} alt="" className="first" />
        </div>

        <div className="about_us div2">
          <p className="p sp">
            Every registered user gets a unique 12 digit generated ID which can
            be used for accessing all the medical records of the person from
            birth till date from anywhere across the globe.{" "}
          </p>
          <img src={three} alt="" className="second" />
        </div>

        <div className="about_us div3">
          <p className="p tp">
            Once uploaded the document cannot be removed: This ensures that a
            document cannot be duplicated but demands utmost caution of the
            uploader before uploading any document.{" "}
          </p>
          <img src={thirteen} alt="" className="third" />
        </div>
        
      </div>
      <div className="teams">
        <h2 className="h2 center">
          <center>Our Team</center>
        </h2>
        <br />
        <br />
        <br />
        <div className="raihan">
          <div className="border">
            <img src={raihan} alt="" />
          </div>
          <h4>Raihan Khan</h4>
          <h5 className="h5">Backend Developer</h5>
        </div>
        <div className="aritra">
          <div className="border">
            <img src={aritra} alt="" />
          </div>
          <h4>Aritra Roy</h4>
          <h5 className="h5">Backend Developer</h5>
        </div>
        <div className="risav">
          <div className="border">
            <img src={risav} alt="Risav" />
          </div>
          <h4>Risavdeb Patra</h4>
          <h5 className="h5">Frontend Developer</h5>
        </div>
        <div className="sayak">
          <div className="border">
            <img src={sayak} alt="Sayak" />
          </div>
          <h4>Sayak Sarkar</h4>
          <h5 className="h5">Frontend Developer</h5>
        </div>
      </div>
      <div className="teams_phone">
        <h2 className="H2center">
          Our Team
        </h2>
        <div className="card_about">
            <div className="border">
              <img src={raihan} alt="" />
            </div>
            <h4>Raihan Khan</h4>
            <h5 className="h5">Backend Developer</h5>
        </div>
        <div className="card_about">
          <div className="border">
            <img src={aritra} alt="" />
          </div>
          <h4>Aritra Roy</h4>
          <h5 className="h5">Backend Developer</h5>
        </div>
        <div className="card_about">
          <div className="border">
            <img src={risav} alt="Risav" />
          </div>
          <h4>Risavdeb Patra</h4>
          <h5 className="h5">Frontend Developer</h5>
        </div>
        <div className="card_about">
          <div className="border">
            <img src={sayak} alt="Sayak" />
          </div>
          <h4>Sayak Sarkar</h4>
          <h5 className="h5">Frontend Developer</h5>
        </div>
      </div>
      <div className="bottom_land">
        <h5 className="h5">©Zephyrus</h5>
      </div>
    </div>
  );
}
