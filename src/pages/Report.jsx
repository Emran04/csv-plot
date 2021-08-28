import React from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import TableStyles from "./../styles/Table.style";
import Table from "./../components/Table";

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

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "Date",
      },
      {
        Header: "AAPL.Open",
        accessor: "AAPL_Open",
      },
      {
        Header: "AAPL.High",
        accessor: "AAPL_High",
      },
      {
        Header: "AAPL.Low",
        accessor: "AAPL_Low",
      },
      {
        Header: "AAPL.Close",
        accessor: "AAPL_Close",
      },
      {
        Header: "AAPL.Volume",
        accessor: "AAPL_Volume",
      },
    ],
    []
  );

  return (
    <div>
      <h2>Report</h2>
      {data.data && (
        <CSVLink data={data.data} filename={"data.csv"}>
          Download me
        </CSVLink>
      )}

      {
        data.data && <TableStyles>
        <Table columns={columns} data={data.data} />
      </TableStyles>
      }

      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Date</th>
            <th>AAPL.Open</th>
            <th>AAPL.High</th>
            <th>AAPL.Low</th>
            <th>AAPL.Close</th>
            <th>AAPL.Volume</th>
            <th>AAPL.Adjusted</th>
            <th>dn</th>
            <th>mavg</th>
            <th>up</th>
            <th>direction</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            data.data.map((row, index) => (
              <tr key={`data-row-${index}`}>
                <td>{index + 1}</td>
                <td>{row["Date"]}</td>
                <td>{row["DaAAPL.Opente"]}</td>
                <td>{row["AAPL.High"]}</td>
                <td>{row["AAPL.Low"]}</td>
                <td>{row["AAPL.Close"]}</td>
                <td>{row["AAPL.Volume"]}</td>
                <td>{row["AAPL.Adjusted"]}</td>
                <td>{row["dn"]}</td>
                <td>{row["mavg"]}</td>
                <td>{row["up"]}</td>
                <td>{row["direction"]}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2>Plot</h2>
      <Plot data={demoData} layout={layout} />
    </div>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  data: state.data,
});
// Connect Redux to React
export default connect(mapStateToProps)(Report);
