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

    const colors = [
        'red',
        'green',
        'blue',
        'orange',
        'red',
        'green',
        'blue',
        'orange',
        'red',
        'green',
        'blue',
        'orange',
        'red',
        'green',
        'blue',
        'orange'
    ];

    const plotData = [];
    let dataObjCount = 0;
    for (const objProp in dataObj) {
        let value = parseFloat(dataObj[objProp])
        if (objProp !== 'Date' && typeof value === 'number') {
            plotData.push({
                x: dataObj['Date'],
                y: dataObj[objProp],
                type: "histogram",
                autobinx: false, 
                histnorm: "count",
                opacity: 0.5,
                marker: {
                    color: colors[dataObjCount],
                },
            })
            dataObjCount++;
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
