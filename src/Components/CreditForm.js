import React from "react";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {FormGroup, FormControl, Button} from "react-bootstrap";

const CreditForm = (props) =>{
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("You enter an invalid email address").required("Required"),
        rollno: Yup.number()
                    .positive("Invalid roll number")
                    .integer("Invalid roll number")
                    .required("Required")
    }); 

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>     
            { formik  => (
                 <Form  encType="multipart/form-data" >
                 <FormGroup>
                     <Field name="name" type="text" className="form-control"/>
                     <ErrorMessage name="name" className="d-block invalid-feedback" component="span"/>
                 </FormGroup>

                 <FormGroup>
                     <Field name="email" type="text" className="form-control"/>
                     <ErrorMessage name="email" className="d-block invalid-feedback" component="span"/>
                 </FormGroup>

                 <FormGroup>
                     <Field name="rollno" type="text" className="form-control"/>
                     <ErrorMessage name="rollno" className="d-block invalid-feedback" component="span"/>
                 </FormGroup>

                 <FormGroup>
                     <input type="file" className="form-control" onChange={(event)=>{
                         formik.setFieldValue('photo', event.currentTarget.files[0])
                     }}/>
                     <ErrorMessage name="ṕhoto" className="d-block invalid-feedback" component="span"/>
                    { formik.values.photo != '' &&
                        <img  src={formik.values.photo} alt='photo credito' />
                    } 
                 </FormGroup>                    


                 

                 <Button variant="danger" size="lg" block="block" type="submit">
                     {props.children}
                 </Button>

             </Form>
            )}           
            </Formik>
        </div>
    );
}

export default CreditForm;