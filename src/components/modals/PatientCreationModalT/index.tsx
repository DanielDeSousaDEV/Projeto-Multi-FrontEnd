import { InputMask } from "@react-input/mask"
import { useFormik } from "formik";
import { Button, Col, Form, Modal, ModalProps, Row } from "react-bootstrap"
import { PatientInitialValues } from "../../../utils/InitialValues/PatientInitialValues";
import { CreatePatient } from "../../../utils/validation/CreatePatient";
import { useState } from "react";
import { api } from "../../../api/config";
import { cpfValidator } from "../../../utils/functions/cpfValidator";

type PatientCreationModalProps = {
    // onSubmitForm: (e:React.FormEvent<HTMLFormElement>)=>void
} & ModalProps

export function PatientCreationModalT ({...rest}:PatientCreationModalProps) {
    // , e:React.FormEvent<HTMLFormElement>

    
    const formik = useFormik({
        initialValues: PatientInitialValues,
        validationSchema: CreatePatient,
        onSubmit: (values) => {
            try{
                api.post('/pacientes', values)

                //tá dando erro porque o backend tá esperando os nomes em portugues
            }catch(error){
                console.log(error)
            }
        }
      });      
      
      function debug() {
        console.log(formik.errors)
        console.log(formik.values)
        //o erro vai mas não aparece
        console.log(cpfValidator('622.630.883-42'))
      }

    return(
        <>
            <Modal show={true} animation centered size="xl">
                <Modal.Header closeButton>
                <Modal.Title>Novo Paciente</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="NomeCompleto">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control required isInvalid={formik.touched.name && Boolean(formik.errors.name)} {...formik.getFieldProps('name')} placeholder="Digite seu nome" />
                            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="DataNasc">
                                    <Form.Label>Data de nascimento</Form.Label>
                                    <Form.Control required isInvalid={formik.touched.birthDate && Boolean(formik.errors.birthDate)} {...formik.getFieldProps('birthDate')} type="date" max="9999-12-31" />
                                    <Form.Control.Feedback type="invalid">{formik.errors.birthDate}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="cpf">
                                    <Form.Label>CPF</Form.Label>
                                    {/* <Form.Control required as={InputMask} name="cpf" mask="nnn.nnn.nnn-nn" replacement={{n:/[0-9]/}} type="text" placeholder="xxx.xxx.xxx-xx"/> */}
                                    <Form.Control required isInvalid={formik.touched.cpf && Boolean(formik.errors.cpf)} {...formik.getFieldProps('cpf')} as={InputMask} mask="nnn.nnn.nnn-nn" replacement={{n:/[0-9]/}} placeholder="xxx.xxx.xxx-xx" />
                                    <Form.Control.Feedback type="invalid">{formik.errors.cpf}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="telephone">
                            <Form.Label>Número de telefone</Form.Label>
                            {/* <Form.Control required as={InputMask} name="telephone" mask="(nn)nnnnn-nnnn" replacement={{n:/[0-9]/}} type="text" placeholder="(xx) xxxxx-xxxx"/> */}
                            <Form.Control required isInvalid={formik.touched.telephone && Boolean(formik.errors.telephone)} {...formik.getFieldProps('telephone')} as={InputMask} mask="(nn)nnnnn-nnnn" replacement={{n:/[0-9]/}} placeholder="(xx)xxxxx-xxxx"/>
                            <Form.Control.Feedback type="invalid">{formik.errors.telephone}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Foto" >
                            <Form.Label>Foto do paciente</Form.Label>
                            <Form.Control required isInvalid={formik.touched.photo && Boolean(formik.errors.photo)} type="file"
                                onChange={(event) => {
                                    const file = (event.currentTarget as HTMLInputElement).files?.[0]
                                    formik.setFieldValue('photo', file)
                                }}
                                // não aparece da maneira que eu queria talvez pelo getInputsFields 
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.photo}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="justify-content-end d-flex gap-3">
                            <Button variant="secondary" onClick={debug}>Cancelar</Button>
                            <Button variant="primary" type="submit">Salvar novo paciente</Button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}