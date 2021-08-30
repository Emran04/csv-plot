import React, { useState } from "react";
import { connect } from "react-redux";
import { loadData } from "./../actions";
import headerColumns from './../constants/dataColumns';
import Container from "./../styles/Container.style";
import {Button} from "./../styles/components.style";

const UploadCSV = ({ dispatch }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null)
    // const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('No file found')
            return
        }
        setMessage('Processing...!')
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const data = csvToArray(text);
            dispatch(loadData(data));
        };

        reader.readAsText(file);
        setMessage('File uploaded successfully!')
    };

    const handleOnChange = (e) => {
        setMessage(null)
        setFile(e.target.files[0]);
    };

    const csvToArray = (str, delimiter = ",") => {
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter).map(item => item.trim());
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function (object, header, index) {
                let columnObj = headerColumns.find(item => item.key === header)
                if (columnObj) {
                    object[columnObj.accessor] = values[index];
                } else {
                    object[header] = values[index];
                }
                return object;
            }, {});
            return el;
        });

        // return the array
        return arr;
    };

    return (
        <Container>
            <div className="upload-form">
                {
                    message && <p>{message}</p>
                }

                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        name="file"
                        id="file-field"
                        onChange={handleOnChange}
                    />
                    <Button
                        type="submit"
                    >Upload file</Button>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(UploadCSV);
