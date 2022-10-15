import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../src/imgs/MedBaseCrack.png";
import "../styles/Err.css"

export default function Error() {
  return (
    <div className='container_err'>
      <div className="err_main">
        <img className="err_logo" src={logo} alt="logo"/>
        <h2 className="err_text"> Oops! It Seems We Ran Into An <b style={{color:"#2D9DA4"}}>Error</b></h2>
      </div>
    </div>
  )
}
