/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from "../../commons/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

async function extractChart(id){
    return fetch('http://localhost:8082/measurements/chart/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
}

class ChartM extends Component {
    render() {
        const savedItem = localStorage.getItem("credentials");
        const parsedItem = JSON.parse(savedItem);
        const res=extractChart(parsedItem.id);
        console.log(res);
        console.log("it worked");
        const options = {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Most Popular Social Networking Sites"
            },
            axisX: {
                title: "Social Network",
                reversed: true,
            },
            axisY: {
                title: "Monthly Active Users",
                includeZero: true,
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: [
                    { y:  2200000000, label: "Facebook" },
                    { y:  1800000000, label: "YouTube" },
                    { y:  800000000, label: "Instagram" },
                    { y:  563000000, label: "Qzone" },
                    { y:  376000000, label: "Weibo" },
                    { y:  336000000, label: "Twitter" },
                    { y:  330000000, label: "Reddit" }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
    addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
}
export default ChartM;