import lighthouse from "@lighthouse-web3/sdk";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import auth, { db } from "../firebase-config";
import NavBar from "./MedNav.jsx";

export default function Dashboard() {
  const [userName, setuserName] = useState("");
  const [userCID, setuserCID] = useState([]);
  const [userPhoneNumber, setuserPhoneNumber] = useState("");
  const [userUID, setuserUID] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      checkDatabase(
        "+91 ".concat(user.phoneNumber.substring(3)),
        user.uid.substring(13).toUpperCase()
      );
    } else {
      console.log("User not signed in");
    }
  });

  async function checkDatabase(ph, uid) {
    // console.log(ph);
    // console.log(uid);
    const docRef = doc(db, "users", ph);
    const docSnap = await getDoc(docRef);

    setuserPhoneNumber(ph);
    setuserUID(uid);
    setuserName(docSnap.get("name"));
    setuserCID(docSnap.get("cid"));
    // console.log(userCID);
  }

  const deploy = async (e) => {
    // Get a bearer token
    // Push file to lighthouse node
    const output = await lighthouse.deploy(e, `f3e100fa-1b53-4a54-8872-effed3ef543c`);
    console.log("File Status:", output);
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */
    console.log("Visit at https://ipfs.io/ipfs/" + output.Hash);
    
  };

  return (
    <section>
      {<NavBar />}
      <div className="container">
        <h1 className="heading_dashboard fw-bold mb-4 text-center">
          Dashboard
        </h1>
        <div className="row justify-content-center align-items-center position-float">
          <div className="card">
            <div className="top">
              <h2 className="name">{userName}</h2>
              <img
                className="circle-img"
                src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                alt="avatar_img"
              />
            </div>
            <div className="bottom">
              <p className="info">{userUID}</p>
              <p className="info">{userPhoneNumber}</p>
            </div>
          </div>
        </div>

        <div
          className="tableBox"
          style={{
            height: "40px",
            borderRadius: "15px 15px 0px 0px",
            background: "#f8f9fa",
          }}
        ></div>

        <div className="tab mb-3">
          <table className="table table-hover table-responsive table-light rounded-2">
            <thead>
              <tr>
                <th colSpan="4">
                  <h6 className="text-center fw-bold">Upload Documents</h6>
                  <div className="d-flex bd-highlight mx-4">
                    <div className="App">
                      <input onChange={(e) => deploy(e)} type="file" />
                    </div>
                  </div>
                  <h6 className="text-center">. . .</h6>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Id.
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  File Name
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Uploaded On
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userCID.map((data) => {
                return (
                  <tr>
                    <th scope="row" style={{ textAlign: "center" }}>
                      {data.id}
                    </th>
                    <td style={{ textAlign: "center" }}>{data.title}</td>
                    <td
                      className="small text-muted"
                      style={{ textAlign: "center" }}
                    >
                      {data.date}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={"https://dweb.link/ipfs/" + data.hash}
                      >
                        <button
                          type="button"
                          className="btn btn-sm btn-primary justify-content-right"
                        >
                          View
                        </button>
                      </a>
                      <a
                        href={
                          "https://dweb.link/ipfs/" +
                          data.hash +
                          "?filename=" +
                          data.title +
                          "." +
                          data.type +
                          "filename.png&download=true"
                        }
                      >
                        <button
                          type="button"
                          className="btn mx-lg-4 mx-md-2 btn-success btn-sm"
                        >
                          Download
                        </button>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
