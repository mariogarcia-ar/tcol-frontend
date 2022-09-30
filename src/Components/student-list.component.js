import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert';
import { Table } from "react-bootstrap"; 

import config from '../config/index';

import StudentTableRow from "./StudentTableRow";


// List Student Component
const StudentList = () =>{
    const [students, setStudents] = useState([]);
    const _url = config.API_URL+"/students/";
    const alert = useAlert();

    // load data from server and reinitilize student form
    useEffect(() =>{
        axios.get(_url)
                .then(res =>{
                    if(res.status === 200){ 
                        setStudents(res.data);
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))
    },[])

    // iterador de las filas de las tablas
    const DataTable = () => {
        return students.map((res, i) =>{
            return <StudentTableRow obj={res} key={i} />;
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

export default StudentList;