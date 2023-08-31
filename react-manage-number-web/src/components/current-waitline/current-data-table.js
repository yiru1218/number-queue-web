import "./current-data-table.css"
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import React, { useState, useEffect } from 'react';

const columns = [
    { field: 'number', headerName: 'Number', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
];

const CurrentDataTable = () => {

    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        getCurrentData();
    }, []);

    const getCurrentData = () => {
        axios.get('http://127.0.0.1:8000/current-data')
        .then((res) => {
            setRowsData(res.data);
        });
    };

    return (
        <div className="data-table">
            <div style={{ height: 371, width: '100%'}}>
                <DataGrid
                    rows={rowsData}
                    columns={columns}
                    getRowId={(row) => row._id} /*這邊搞丸好久*/ 
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection />
            </div>
            <div className="footer">
                最後更新時闇:
            </div>
        </div>
    );
};

export default CurrentDataTable;