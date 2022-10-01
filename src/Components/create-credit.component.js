import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'

import config from '../config/index';

import CreditForm from "./CreditForm";


// Create Credit Component
const CreateCredit = () =>{
    const [formValues, setFormValues] = useState({name:'', email:'', rollno:'', photo:''});
    const _url = config.API_URL+"/credits/create-credit/";
    let navigate = useNavigate();
    const alert = useAlert();

    const onSubmit = creditObject =>{
        const formData = new FormData();
        for (let value in creditObject) {
            formData.append(value, creditObject[value]);
        }

        // axios.post(_url, formData).
        axios.post(_url, formData)
                .then(res =>{
                    if(res.status === 200){
                        alert.success('Credit successfully created');
                        navigate("/credit-list");
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))                
    }

    return (
        <CreditForm initialValues={formValues} onSubmit={onSubmit} enableReinitilize>
            Create Credit
        </CreditForm>
    );
}

export default CreateCredit;