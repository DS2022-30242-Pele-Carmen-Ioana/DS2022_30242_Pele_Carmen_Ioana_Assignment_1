import React from "react";
import styles from "../commons/styles/project-style.css";
import {BrowserRouter as Router} from "react-router-dom";

import BackgroundImg from "../commons/images/wp4546351.jpg";
import ChartM from "../measurements/components/measurements-chart";
import MD from "../device/measurement-device";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "800px",
    color:'white',
    backgroundImage: `url(${BackgroundImg})`
};

class Client extends React.Component{

    render() {
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
                        <h1> Welcome Client! </h1>
                        <h3>{parsedItem.id}</h3>
                        <button><a href={"/client/device"}>my devices</a> </button>
                        <button><a href={"/client/measurements"}>measurements</a> </button>
                        <ChartM />
                        <MD/>
                    </div>
                </Router>
            </div>
        )
    };

}
export default Client