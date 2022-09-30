import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAlert } from 'react-alert';
import { Button } from "react-bootstrap";  
import { Link } from "react-router-dom";
import config from '../config/index';

// List Student Component
const StudentTableRow = (props) =>{
    const {_id, name, email, rollno} = props.obj;
    const _url = config.API_URL+"/students/delete-student/"+_id;
    const alert = useAlert();

    const deleteStudent = () =>{
        axios.delete(_url)
                .then(res =>{
                    if(res.status === 200){
                        alert.success('Student successfully deleted');
                        window.location.reload();
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))
    }
     
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{rollno}</td>
            <td>
                <Link className="edit-link" to={'/edit-student/'+_id}>Edit</Link>
                <Button onClick={deleteStudent} size="sm" variant="danger">Delete</Button>
            </td>
        </tr>
    )
}

export default StudentTableRow;