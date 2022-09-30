import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'

import config from '../config/index';

import StudentForm from "./StudentForm";


// Create Student Component
const CreateStudent = () =>{
    const [formValues, setFormValues] = useState({name:'', email:'', rollno:''});
    const _url = config.API_URL+"/students/create-student/";
    let navigate = useNavigate();
    const alert = useAlert();

    const onSubmit = studentObject =>{
        axios.post(_url, studentObject)
                .then(res =>{
                    if(res.status === 200){
                        alert.success('Student successfully created');
                        navigate("/student-list");
                    }else{
                        Promise.reject();
                    }
                })
                .catch(err => alert.error("Something went wrong "+err))                
    }

    return (
        <StudentForm initialValues={formValues} onSubmit={onSubmit} enableReinitilize>
            Create Student
        </StudentForm>
    );
}

export default CreateStudent;