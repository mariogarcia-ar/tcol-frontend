import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'

import config from '../config/index';

import CreditForm from "./CreditForm";

// Create Credit Component
const EditCredit = (props) =>{
    let params = useParams();
    let navigate = useNavigate();
    const alert = useAlert();

    const [formValues, setFormValues] = useState({name:'', email:'', rollno:'', photo:'', ipfs:''});
    const _url = config.API_URL+"/credits/update-credit/"+params.id;

    const onSubmit = creditObject =>{
        const formData = new FormData();
        for (let value in creditObject) {
            formData.append(value, creditObject[value]);
        }

        // axios.post(_url, formData).
        axios.put(_url, formData)
                .then(res =>{
                    if(res.status === 200){
                        alert.success('Credit successfully updated');
                        navigate("/credit-list");
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))                
    }
    
    // load data from server and reinitilize credit form
    useEffect(() =>{
        axios.get(_url)
                .then(res =>{
                    if(res.status === 200){
                        const {name, email, rollno, photo, ipfs} = res.data;
                        setFormValues({name, email, rollno, photo, ipfs} ); 
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))
    },[])

    return (
        <CreditForm   initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
            Update Credit
        </CreditForm>
    )
}

export default EditCredit;