import React, {useState, useEffect} from 'react'
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const PlotHistogram = ({dataArray}) => {
    const [revision, setRevision] = useState(null);

    useEffect(() => {
        
        return () => {
            setRevision(true)
        }
    }, [setRevision])

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
                type: "histogram",
                name: objProp,
                text: dataObj[objProp],
                marker: { size: 12 },
            })
        }
    }

    const layout = {
        xaxis: { type: "date" },
        title: "Histogram",
    };

    return (
        <div>
            <Plot revision={revision} data={plotData} layout={layout} />
        </div>
    )
}

export default PlotHistogram
