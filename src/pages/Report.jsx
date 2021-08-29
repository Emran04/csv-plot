import React, {useState} from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import TableStyles from "./../styles/Table.style";
import Table from "./../components/Table";
import columns from "./../constants/dataColumns";
import Container from "./../styles/Container.style";
import PlotScatter from './../components/PlotScatter'
import PlotHistogram from './../components/PlotHistogram'

const Report = ({ data }) => {

    const dataArray = data.data ? data.data : [];

    const tableColumns = React.useMemo(() => columns, []);

    const tabs = ['scatter', 'box', 'histogram'];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    const renderTabs = () => {
        return tabs.map(item => {
            let tabTitle = ''
            if (item === 'scatter') {
                tabTitle = 'Scatter Plot';
            } else if (item === 'box') {
                tabTitle = 'Box Plot';
            } else if (item === 'histogram') {
                tabTitle = 'Histogram';
            }
            return <button
                key={`tab-${item}`}
                onClick={() => handleTabChange(item)}
            >{tabTitle}</button>
        })
    }

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
                    {renderTabs()}
                    {
                        activeTab === 'scatter' && <PlotScatter dataArray={dataArray} />
                    }
                    {
                        activeTab === 'box' && <PlotHistogram dataArray={dataArray} />
                    }
                    {
                        activeTab === 'histogram' && <PlotHistogram dataArray={dataArray} />
                    }
                </div>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps)(Report);
