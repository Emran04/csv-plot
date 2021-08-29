import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import thunk from 'redux-thunk'
import UploadCSV from "./pages/UploadCSV";
import Report from "./pages/Report";
import reducer from "./reducers";

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/report">Report</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/report">
                            <Report />
                        </Route>
                        <Route path="/">
                            <UploadCSV />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
