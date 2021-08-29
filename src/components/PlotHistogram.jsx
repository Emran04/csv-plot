import React from 'react'
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const PlotHistogram = ({dataArray}) => {
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
                x: dataObj[objProp],
                type: "histogram",
                opacity: 0.5,
                marker: {
                    color: 'green',
                },
            })
        }
    }

    const layout = {
        xaxis: { type: "date" },
        title: "Histogram",
    };

    return (
        <div>
            <Plot data={plotData} layout={layout} />
        </div>
    )
}

export default PlotHistogram
