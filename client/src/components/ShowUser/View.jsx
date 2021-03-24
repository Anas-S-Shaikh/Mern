import React from 'react'
import CustomTable from './CustomTable';
import "./style.css";

const View = () => {
    return (
        <div className='view'>
            <h1>All Users Data Stored in Databse <small>(sorted by DOB)</small></h1>
            {/* <Table /> */}
            <CustomTable />
        </div>
    )
}

export default View
