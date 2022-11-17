import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    device: '/device'
};

function getDevices(callback) {
    let request = new Request(HOST.backend_api + endpoint.device, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getDeviceById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.device + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function addDevice(device, callback){
    let request = new Request(HOST.backend_api + endpoint.device , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
function updateDevice(id,device, callback){
    let request = new Request(HOST.backend_api + endpoint.device +"/"+id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
function deleteDevice(id,callback){
    let request = new Request(HOST.backend_api + endpoint.device +"/"+id, {
        method: 'DELETE'
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
function addDeviceToUser(idUser,idDevice, callback){
    let request = new Request(HOST.backend_api + "/users/"+ idUser+"/"+idDevice, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
function getMyDevices(idUser, callback){
    let request = new Request(HOST.backend_api + "/users/mydevices/" + idUser, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function addMeasureToDevice(idMeasure, idDevice, callback){
    let request = new Request(HOST.backend_api + endpoint.device + "/"+idDevice+"/"+idMeasure, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


export {
    getDevices,
    getDeviceById,
    updateDevice,
    deleteDevice,
    addDeviceToUser,
    getMyDevices,
    addMeasureToDevice,
    addDevice
};
