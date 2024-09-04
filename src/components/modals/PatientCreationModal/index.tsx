import { InputMask } from "@react-input/mask"
import { useFormik } from "formik";
import { Button, Col, Form, Modal, ModalProps, Row } from "react-bootstrap"
import { PatientInitialValues } from "@utils/InitialValues/PatientInitialValues";
import { CreatePatient } from "@utils/validation/CreatePatient"
// import { CreatePatient } from "../../../utils/validation/CreatePatient";
import { api } from "@/api/config";

type PatientCreationModalProps = {
    handleClose: ()=>void,
} & ModalProps

export function PatientCreationModal ({handleClose, handleShow, ...rest}:PatientCreationModalProps) {
    const formik = useFormik({
        initialValues: PatientInitialValues,
        validationSchema: CreatePatient,
        onSubmit: (values) => {
            try{
                const patientData = {
                    ...values,
                    condition: 'Indefinido',
                    photo: formik.values.photo
                }
                
                console.log(patientData.photo)
                
                api.post('/patients', patientData)

                handleClose()
                
                //tá dando erro porque o backend tá esperando os nomes em portugues

            }catch(error){
                console.log(error)
            }
        }
      });      
      
      function debug() {
        console.log(formik.values);
        
      }

    return(
        <>
            <Modal {...rest} onHide={handleClose}>
                <Modal.Header closeButton autoFocus>
                <Modal.Title>Novo Paciente</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control required isInvalid={formik.touched.name && Boolean(formik.errors.name)} {...formik.getFieldProps('name')} placeholder="Digite seu nome" />
                            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="birthDate">
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
                            <Form.Control required isInvalid={formik.touched.telephone && Boolean(formik.errors.telephone)} {...formik.getFieldProps('telephone')} as={InputMask} mask="(nn)nnnn-nnnn" replacement={{n:/[0-9]/}} placeholder="(xx)xxxxx-xxxx"/>
                            <Form.Control.Feedback type="invalid">{formik.errors.telephone}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="photo">
                            <Form.Label>Foto do paciente</Form.Label>
                            <Form.Control 
                                required 
                                isInvalid={formik.touched.photo && Boolean(formik.errors.photo)} 
                                {...formik.getFieldProps('photo')}
                                type="file" 
                                value={undefined}
                                name="photo"
                                onChange={(event) => {
                                    const file = (event.currentTarget as HTMLInputElement).files?.[0]
                                    formik.setFieldValue('photo', file)
                                    console.log(file)
                                }}
                                // não aparece da maneira que eu queria talvez pelo getInputFields 
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
            <Button onClick={debug}>aa</Button>
        </>
    )
}