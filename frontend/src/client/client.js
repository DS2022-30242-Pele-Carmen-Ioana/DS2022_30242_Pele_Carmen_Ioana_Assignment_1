import React, {useState} from "react";
import styles from "../commons/styles/project-style.css";
import {BrowserRouter as Router} from "react-router-dom";

import BackgroundImg from "../commons/images/wp4546351.jpg";
import MD from "../device/measurement-device";
import ApexChart, {Barchart} from "../measurements/components/measurements-chart";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "800px",
    color:'white',
    backgroundImage: `url(${BackgroundImg})`
};

const Client=()=>{
        const savedItem = localStorage.getItem("credentials");
        const parsedItem = JSON.parse(savedItem);

        if(parsedItem.role!="client"){
            alert("NOT ALLOWED");
            window.open("/","_self");
        }
        return (

            <div className={styles.back}>
                <Router >
                    <div style={backgroundStyle}>
                        <button><a href={"/client/device"}>my devices</a> </button>
                        <button><a href={"/client/measurements"}>measurements</a> </button>
                        <br/><br/>
                        <h1> Welcome Client! </h1>
                        <h3>{parsedItem.id}</h3>

                        <Barchart/>

                    </div>
                </Router>
            </div>
        )

}
export default Client