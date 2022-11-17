import React, {useState} from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';


import * as API_DEVICES from "./api/device-api"
import DeviceTable from "./components/device-table";
import DeviceForm from "./components/device-form";
import BackgroundImg from "../commons/images/wp4546351.jpg";

const backgroundStyle = {
    color:'black',
};
async function addDeviceToUser( idUser,idDevice){
    return API_DEVICES.addDeviceToUser(idUser,idDevice, (result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            console.log("Successfully inserted person with id: " + result);
            this.reloadHandler();
        } else {
            this.setState(({
                errorStatus: status,
                error: error
            }));
        }
    });
}

const DeviceUser=()=> {
    const [idUser, setidUser] = useState();
    const [idDevice, setidDevice] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = addDeviceToUser(idUser, idDevice);
        console.log(res);
        alert("added with success!");
    }



        return (
            <div>
            <CardHeader >
                <strong> Device-User Management </strong>
            </CardHeader>
            <div style={backgroundStyle}>

                <Card>
                    <form >
                        <label>
                            <p>id User</p>
                            <input type="text" onChange={e => setidUser(e.target.value)}/>
                        </label>
                        <br/>
                        <label>
                            <p>id Device</p>
                            <input type="text" onChange={e => setidDevice(e.target.value)}/>
                        </label>
                        <div>
                            <button type="submit" onClick={ handleSubmit}>Add</button>
                        </div>
                    </form>
                </Card>

            </div></div>
        )


}


export default DeviceUser;
