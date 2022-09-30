import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAlert } from 'react-alert';
import { Button } from "react-bootstrap";  
import { Link } from "react-router-dom";
import config from '../config/index';

// List Credit Component
const CreditTableRow = (props) =>{
    const {_id, name, email, rollno} = props.obj;
    const _url = config.API_URL+"/credits/delete-credit/"+_id;
    const alert = useAlert();

    const deleteCredit = () =>{
        axios.delete(_url)
                .then(res =>{
                    if(res.status === 200){
                        alert.success('Credit successfully deleted');
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
                <Link className="edit-link" to={'/edit-credit/'+_id}>Edit</Link>
                <Button onClick={deleteCredit} size="sm" variant="danger">Delete</Button>
            </td>
        </tr>
    )
}

export default CreditTableRow;