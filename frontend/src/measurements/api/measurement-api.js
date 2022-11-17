import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    measurement: '/measurements'
};

function getMeasurements(callback) {
    let request = new Request(HOST.backend_api + endpoint.measurement, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMeasurementById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.measurement + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMeasurement(measurement, callback){
    let request = new Request(HOST.backend_api + endpoint.measurement , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurement)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
function updateMeasurement(id,measurement, callback){
    let request = new Request(HOST.backend_api + endpoint.measurement +"/"+id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurement)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
function deleteMeasurement(id,callback){
    let request = new Request(HOST.backend_api + endpoint.measurement +"/"+id, {
        method: 'DELETE'
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}



export {
    getMeasurements,
    getMeasurementById,
    updateMeasurement,
    deleteMeasurement,
    postMeasurement
};
