import lighthouse from "@lighthouse-web3/sdk";
import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import auth, { db } from "../firebase-config";
import NavBar from "./MedNav.jsx";

export default function Dashboard() {
  const [userName, setuserName] = useState("");
  const [userCID, setuserCID] = useState([]);
  const [userPhoneNumber, setuserPhoneNumber] = useState("");
  const [userUID, setuserUID] = useState("");
  const [emptyDB, setemptyDB] = useState(false);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

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
    const docRef = doc(db, "users", ph);
    const docSnap = await getDoc(docRef);

    setuserPhoneNumber(ph);
    setuserUID(uid);
    setuserName(docSnap.get("name"));
    setuserCID(docSnap.get("cid"));
    console.log(userCID);
    if(userCID.length === 0){
      setemptyDB(true);
    }
  
  }

  const deploy = async (e) => {
    // Get a bearer token
    // Push file to lighthouse node
    console.log(e.target.value.substring(12, e.target.value.length - 4));
    const fileName = e.target.value.substring(12, e.target.value.length - 4);
    const fileType = e.target.value.substring(e.target.value.length - 4, e.target.value.length);

    const output = await lighthouse.deploy(e, `f3e100fa-1b53-4a54-8872-effed3ef543c`);
    writeToDoc(output, fileName, fileType);
      
  };

  async function writeToDoc(output, fileName, fileType) {
    console.log(typeof(output));
    console.log(output.data.Hash);
    await updateDoc(doc(db, "users", userPhoneNumber), {
      cid: arrayUnion({
        id: userCID.length + 1,
        title: fileName + String(userCID.length + 1),
        date: today,
        type: fileType,
        hash: output.data.Hash,
      }),
    })

    console.log("Title" + String(userCID[userCID.length - 1].id + 1));
    console.log(userPhoneNumber);
    console.log(today);

    console.log("File Status:", output);
  }

  return (
    <section>
      {<NavBar />}
      <div className="container">
        <h1 className="heading_dashboard fw-bold mt-5 text-center">
          Dashboard
        </h1>
        <div className="row justify-content-center align-items-center position-float">
          <div className="card_dash">
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
                      <input onChange={(e) => deploy(e)} type="file" id="myfile" name="myfile"/>
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
              {emptyDB === true ? (
                <>
                <div>
                  No data available
                </div>
                </>
              ) : 
              <>
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
                        href={"https://gateway.lighthouse.storage/ipfs/" + data.hash}
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
                          "https://gateway.lighthouse.storage/ipfs/" +
                          data.hash +
                          "?filename=" +
                          data.title +
                          "." +
                          data.type +
                          "&download=true"
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
              </>}
            </tbody>
          </table>
          <div className="tableBox_b">
          </div>
        </div> 
      </div>
    </section>
  );
}
