import React from 'react'
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const PlotScatter = ({dataArray}) => {

    const dataObj = {}

    for (let i = 0; i < dataArray.length; i++) {
        const element = dataArray[i];
        for (const property in element) {
            if (element[property]) {
                if (dataObj[property] === undefined) {
                    dataObj[property] = []
                }
                dataObj[property].push(element[property])
            }
        }
    }

    const plotData = [];
    for (const objProp in dataObj) {
        if (objProp !== 'Date') {
            plotData.push({
                x: dataObj['Date'],
                y: dataObj[objProp],
                mode: "markers",
                type: "scatter",
                name: objProp,
                text: dataObj[objProp],
                marker: { size: 12 },
            })
        }
    }

    const layout = {
        xaxis: { type: "date" },
        title: "Scatter Plot",
    };

    return (
        <div>
            <Plot data={plotData} layout={layout} />
        </div>
    )
}

export default PlotScatter
