import React from "react";
import styles from "../commons/styles/project-style.css";
import {BrowserRouter as Router} from "react-router-dom";
import BackgroundImg from "../commons/images/wp4546351.jpg";
import DeviceUser from "../device/device-user";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "3000px",
    color:'white',
    backgroundImage: `url(${BackgroundImg})`
};

class Admin extends React.Component{

    render() {
        const savedItem = localStorage.getItem("credentials");
        const parsedItem = JSON.parse(savedItem);
        if(parsedItem.role!="admin"){
            alert("NOT ALLOWED");
            window.open("/","_self");
        }
        return (
            <div className={styles.back}>
                <Router >
                    <div style={backgroundStyle}>
                        <h1> Welcome Admin!</h1>
                        <h3>{parsedItem.id}</h3>
                        <button><a href={"/admin/users"}>users</a> </button>
                        <button><a href={"/admin/device"}>devices</a> </button>
                        <button><a href={"/admin/mydevice"}>my devices</a> </button>
                        <button><a href={"/admin/measurements"}>measurements</a> </button>
                        <button><a href={"/admin/addDeviceToUser"}>add Device to User</a> </button>
                        <DeviceUser />
                    </div>
                </Router>
            </div>
        )
    };

}
export default Admin