import React from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import TableStyles from "./../styles/Table.style";
import Table from "./../components/Table";
import columns from "./../constants/dataColumns";
import Container from "./../styles/Container.style";

const Plot = createPlotlyComponent(Plotly);

const Report = ({ data }) => {
    var trace1 = {
        x: ["2021-08-22", "2021-08-23", "2021-08-24", "2021-08-25", "2021-08-28"],
        y: [1, 6, 3, 6, 1],
        mode: "markers",
        type: "scatter",
        name: "Team A",
        text: ["A-1", "A-2", "A-3", "A-4", "A-5"],
        marker: { size: 12 },
    };

    var trace2 = {
        x: ["2021-08-22", "2021-08-23", "2021-08-24", "2021-08-25", "2021-08-28"],
        y: [4, 1, 7, 1, 4],
        mode: "markers",
        type: "scatter",
        name: "Team B",
        text: ["B-a", "B-b", "B-c", "B-d", "B-e"],
        marker: { size: 12 },
    };

    var demoData = [trace1, trace2];

    var layout = {
        xaxis: { type: "date" },
        yaxis: {
            range: [0, 8],
        },
        title: "Data Labels Hover",
    };

    const tableColumns = React.useMemo(() => columns, []);

    return (
        <div>
            <Container>
                <div className="data-table">
                    <h2>Report</h2>
                    {data.data && (
                        <CSVLink data={data.data} filename={"data.csv"}>
                            Download me
                        </CSVLink>
                    )}

                    {data.data && (
                        <TableStyles>
                            <Table columns={tableColumns} data={data.data} />
                        </TableStyles>
                    )}
                </div>
            </Container>
            <Container>
                <div className="plot">
                    <h2>Plot</h2>
                    <Plot data={demoData} layout={layout} />
                </div>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps)(Report);
