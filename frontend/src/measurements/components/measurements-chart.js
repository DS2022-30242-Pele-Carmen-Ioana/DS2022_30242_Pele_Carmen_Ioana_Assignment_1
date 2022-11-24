import React from "react";
import { Chart } from "react-google-charts";
import {useState} from "react";
import RestApiClient from "../../commons/api/rest-client";


function getMeasurementsC(id,dateWanted,callback) {
    let request = new Request('http://localhost:8082/measurements/chartm/'+id+"/"+dateWanted, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
async function extractChart(id,dateWanted){
    return getMeasurementsC(id,dateWanted,(result, status, err) => {


        if (result !== null && status === 200) {
            localStorage.setItem('chartdata', JSON.stringify(result.listData))
        }
        else {
            console.log( err)
        }
    });
}
export const options = {
    chart: {
        title: "My devices consuption"
    },
};

export function Barchart() {
    const [dateWanted, setdateWanted] = useState();
    const [res, setRes]=useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const savedItem = localStorage.getItem("credentials");
        const parsedItem = JSON.parse(savedItem);
        extractChart(parsedItem.id,dateWanted);
        const savedItem2 = localStorage.getItem("chartdata");
        const parsedItem2= JSON.parse(savedItem2);
        setRes(parsedItem2);

    }

    return (
        <div className="chart-wrapper">
            <p>Please write the date for which you want to see the chart's informations</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>date wanted</p>
                    <input type="text" onChange={e => setdateWanted(e.target.value)}/>
                </label>
                <br/>
                <div>
                    <button type="submit" onClick={ handleSubmit}>See</button>
                </div>
            </form>

        <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={res}
            options={options}
        />
        </div>
    );
}


