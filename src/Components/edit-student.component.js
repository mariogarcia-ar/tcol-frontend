import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'

import config from '../config/index';

import StudentForm from "./StudentForm";

// Create Student Component
const EditStudent = (props) =>{
    let params = useParams();
    let navigate = useNavigate();
    const alert = useAlert();

    const [formValues, setFormValues] = useState({name:'', email:'', rollno:''});
    const _url = config.API_URL+"/students/update-student/"+params.id;

    const onSubmit = studentObject =>{
        axios.put(_url,studentObject)
                .then(res =>{
                    if(res.status === 200){
                        alert.success('Student successfully updated');
                        navigate("/student-list");
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))
    }

    // load data from server and reinitilize student form
    useEffect(() =>{
        axios.get(_url)
                .then(res =>{
                    if(res.status === 200){
                        const {name, email, rollno} = res.data;
                        setFormValues({name, email, rollno} ); 
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))
    },[])

    return (
        <StudentForm   initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
            Update Student
        </StudentForm>
    )
}

export default EditStudent;