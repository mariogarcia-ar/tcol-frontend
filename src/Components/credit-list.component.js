import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert';
import { Table } from "react-bootstrap"; 

import config from '../config/index';

import CreditTableRow from "./CreditTableRow";


// List Credit Component
const CreditList = () =>{
    const [credits, setCredits] = useState([]);
    const _url = config.API_URL+"/credits/";
    const alert = useAlert();

    // load data from server and reinitilize credit form
    useEffect(() =>{
        axios.get(_url)
                .then(res =>{
                    if(res.status === 200){ 
                        setCredits(res.data);
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))
    },[])

    // iterador de las filas de las tablas
    const DataTable = () => {
        return credits.map((res, i) =>{
            return <CreditTableRow obj={res} key={i} />;
        })
    }

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {DataTable()}
                </tbody>
            </Table>
        </div>
    )
}

export default CreditList;