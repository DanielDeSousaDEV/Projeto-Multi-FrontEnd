import { InputMask } from "@react-input/mask"
import { useFormik } from "formik";
import { Button, Col, Form, Modal, ModalProps, Row } from "react-bootstrap"
import { PatientInitialValues } from "../../../utils/InitialValues/PatientInitialValues";
import { CreatePatient } from "../../../utils/validation/CreatePatient";
import { useState } from "react";

type PatientCreationModalProps = {
    // onSubmitForm: (e:React.FormEvent<HTMLFormElement>)=>void
} & ModalProps

export function PatientCreationModalT ({...rest}) {
    // , e:React.FormEvent<HTMLFormElement>

    const [validate, setValidate] = useState(false)
    
    const formik = useFormik({
        initialValues: PatientInitialValues,
        validationSchema: CreatePatient,
        async onSubmit(values) {
            // preventDefault();
            console.log(values);
        },
      });      
      
      function debug() {
        console.log(formik.values)
      }



    return(
        <>
            <h5>novo paciente</h5>
            <Form onSubmit={()=>{
                formik.handleSubmit()
            }} validated>  {/*o validated não passa ao componente filho*/}
                <Form.Group className="mb-3" controlId="novoPacienteForm.NomeCompleto">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control required {...formik.getFieldProps('name')} placeholder="Digite seu nome" />
                    {formik.touched.name && formik.errors.name && (
                        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                    )}
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="novoPacienteForm.DataNasc">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control required {...formik.getFieldProps('birthDate')}  max="9999-12-31" />
                            {formik.touched.birthDate && formik.errors.birthDate && (
                                <Form.Control.Feedback type="invalid">{formik.errors.birthDate}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="novoPacienteForm.CPF">
                            <Form.Label>CPF</Form.Label>
                            {/* <Form.Control required as={InputMask} name="cpf" mask="nnn.nnn.nnn-nn" replacement={{n:/[0-9]/}} type="text" placeholder="xxx.xxx.xxx-xx"/> */}
                            <Form.Control required {...formik.getFieldProps('cpf')} />
                            {/*  falta isso*/}
                            {formik.touched.cpf && formik.errors.cpf && (
                                <Form.Control.Feedback type="invalid">{formik.errors.cpf}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="novoPacienteForm.Numero">
                    <Form.Label>Número de telefone</Form.Label>
                    {/* <Form.Control required as={InputMask} name="telephone" mask="(nn)nnnnn-nnnn" replacement={{n:/[0-9]/}} type="text" placeholder="(xx) xxxxx-xxxx"/> */}
                    <Form.Control required {...formik.getFieldProps('telephone')} />
                    {formik.touched.telephone && formik.errors.telephone && (
                        <Form.Control.Feedback type="invalid">{formik.errors.telephone}</Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="novoPacienteForm.Foto" >
                    <Form.Label>Foto do paciente</Form.Label>
                    <Form.Control required type="file" {...formik.getFieldProps('photo')} />
                    {formik.touched.photo && formik.errors.photo && (
                        <Form.Control.Feedback type="invalid">{formik.errors.photo}</Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="justify-content-end d-flex gap-3">
                    <Button variant="secondary" onClick={debug}>Cancelar</Button>
                    <Button variant="primary" type="submit">Salvar novo paciente</Button>
                </div>

            </Form>
        </>
    )
}