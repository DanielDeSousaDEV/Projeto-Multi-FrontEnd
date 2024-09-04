import { FormEvent, useEffect, useState } from "react";
import { Accordion, Alert, Badge, Button, Col, Container, Form, FormCheck, Image, Modal, Row, Stack } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom"
import { api } from "../../api/config";
import { ConsultItem } from "./ConsultItem";
import { sintomasOpts } from "../../data/sintomasOpts"
import { defSintPerc } from "../../utils/defSintPerc";
import { defEstado } from "../../utils/defEstado";
import { useFormik } from "formik";
import { ConsultInitialValues } from "@/utils/InitialValues/ConsultInitialValue";
import { consultRegistration } from "@/utils/validation/consultRegistration";
import { defFreqCard } from "@/utils/defFreqCard";
import { defCorFC } from "@/utils/defCorFC";
import { defFreqResp } from "@/utils/defFreqResp";
import { defCorFR } from "@/utils/defCorFR";

export function Perfil () {
    
    let { id } = useParams();

    let [consultas, setConsultas] = useState<Consult[]>([])

    let [paciente, setPaciente] = useState<Patient>({} as Patient)
    
    let [ultEstConsulta, setUltEstConsulta] = useState<string>('')

    let [sucesso, setSucesso] = useState<boolean>()

    let [error, setError] = useState<string>('')

    let [erroModal, setErroModal] = useState<boolean>(false)
    
    let openErroModal = () => {setErroModal(true)}
    let closeErroModal = () => {setErroModal(false)}

    let [loadModal, setLoadModal] = useState<boolean>(true)

    let closeLoadModal = () => {setLoadModal(false)}
    
    useEffect(()=>{PegarTodasConsultas()}, [id, sucesso])
    // useEffect(()=>{PegarDadosPaciente()}, [id])

    const {state} = useLocation()
    
    useEffect(()=>{
        if (!state) {
            PegarDadosPaciente()
            closeLoadModal()
        }else{
            setPaciente(state)
            closeLoadModal()  
        }
    }, [])
    
    useEffect(() => {
        setUltEstConsulta('Indefinido')
        if (consultas.length > 0) {
            setUltEstConsulta(consultas[0].condition)
        }
    }, [consultas])


    const formik = useFormik({
        initialValues: ConsultInitialValues,
        validationSchema: consultRegistration,
        onSubmit: ()=>{
            
            const symptomsPercperception = defSintPerc(formik.values.symptoms)
            
            const consultCondition = defEstado(symptomsPercperception)//tenho que trocar o nome das funções
            
            let symptomsString = ''

            if (formik.values.symptoms.toString()) {
                symptomsString = formik.values.symptoms.toString()
            }

            const {heartRate, respiratoryRate} = formik.values
            
            const consultData = {
                patient_id: paciente.id,
                condition: consultCondition,
                symptoms: symptomsString,
                heartRate: heartRate,
                respiratoryRate: respiratoryRate
            }
            
            api.post(`/consults`, consultData) 

            const updateData = {
                condition: consultCondition
            }

            api.patch(`/patients/${id}`, updateData, {
                headers:{
                    "Content-Type":'application/json'
                }
            }).catch((err)=>{
                console.log(err)
            })
            //a definicao de sintomas esta errada talvez não use mais
        }
    })

    async function PegarDadosPaciente():Promise<void> {
        try {
            await api.get(`/patients/${id}`).then((resp)=>{
                setPaciente(resp.data)
                closeLoadModal()
            }).catch((error)=>{
                closeLoadModal()
                setError(error.message)
                openErroModal()
            })
        } catch (err) {
            console.error('ERRO:' + err);
        }
    }
    
    async function PegarTodasConsultas():Promise<void> {
        try {
            await api.get(`/patients/${id}/consults`).then((resp)=>{
                setConsultas(resp.data)
                console.log(resp)


            }).catch((error)=>{

                console.error(error);
                
                setError(error.message);
                
                openErroModal()
            })
        } catch (err) {
            
            console.error('ERRO:' + err);
            
        }
    }
    
    // async function AdicionarNovaConsulta (e:FormEvent<HTMLFormElement>) {
    //     e.preventDefault()

    //     setSucesso(false)
        
    //     let myForm = e.currentTarget
    //     let myformdata = new FormData(myForm)
        
    //     //Definição do JSON dos sintomas
    //     let sintomasInformados = myformdata.getAll('sintomas')
    //     let sintomasJSON:{sintomas:string[]} = {
    //         sintomas:[]
    //     };
    //     for (let index = 0; index < sintomasInformados.length; index++) {
    //         sintomasJSON.sintomas.push(sintomasInformados[index].toString())            
    //     }
        
    //     myformdata.set('sintomas', JSON.stringify(sintomasJSON))
        
    //     //definição do usuario da consulta
    //     myformdata.append('paciente_id',id!.toString())
        
    //     let consultaPerc = defSintPerc(sintomasJSON)
        
    //     let consultaEst = defEstado(consultaPerc)
        
    //     myformdata.append('estado', consultaEst)
        
    //     await api.post('/consultas', myformdata).then(()=>{
    //         setSucesso(true)

    //         AtualizarCondicao(consultaEst)
    //     }).catch((error)=>{
    //         setError(error.message)
    //         openErroModal()
    //     })
    // }

    async function AtualizarCondicao(condicao:string) {
        //fazer o json
        let PacienteCodicaoJSON = {
            "condicao":condicao
        }

        console.error(PacienteCodicaoJSON);
        

        await api.patch(`/pacientes/${id}`, PacienteCodicaoJSON).catch((error)=>{
            setError(error.message)
            openErroModal()
        })
    }

    function Recarregar() {
        location.reload()
    }

    let dataDeNascNFormat = new Date (paciente?.birthDate!)
    let dataNascFormatada = dataDeNascNFormat.toLocaleDateString('pt-br')

    // console.log(consultas)

    function debug() {
        console.log(formik.getFieldProps('heartRate'))  

    }

    const CatFreqCard = defFreqCard(formik.values.heartRate)

    const CorFreqCard = defCorFC(CatFreqCard)
    
    const CatFreqResp = defFreqResp(formik.values.respiratoryRate)

    const CorFreqResp = defCorFR(CatFreqResp)
    
    return (
        <>
            {paciente && (
                <Container fluid className="md px-5 col-12 my-3">
                    <Row className="p-3 rounded mb-3" style={{backgroundColor:"var(--quaternary)"}}>
                    <h2>Perfil</h2>
                        <Col id="image" className="d-flex justify-content-center" lg={4}>
                            <Image src={paciente?.photo} loading="lazy" fluid draggable={false} thumbnail rounded alt="Foto Do Paciente"/>
                        </Col>
                        <Col id="dados" className="position-relative">
                            <Badge bg="secondary" className="position-absolute top-0 end-0">#ID:{id}</Badge>
                            <Stack gap={3} className="flex-column justify-content-around">
                                <Col>
                                    <p><b>Nome Completo: </b></p>
                                    <Row className="p-2 m-0 rounded" style={{backgroundColor:"var(--quinary)"}}>{paciente?.name}</Row>
                                </Col>
                                <Row className="gap-2">
                                    <Col>
                                        <p><b>CPF: </b></p>
                                        <Row className="p-2 m-0 rounded" style={{backgroundColor:"var(--quinary)"}}>{paciente?.cpf}</Row>
                                    </Col>
                                    <Col>
                                        <p><b>Data de Nascimento: </b></p>
                                        <Row className="p-2 m-0 rounded" style={{backgroundColor:"var(--quinary)"}}>{dataNascFormatada}</Row>
                                    </Col>
                                </Row>
                                <Col>
                                    <p><b>Telefone: </b></p>
                                    <Row className="p-2 m-0 rounded" style={{backgroundColor:"var(--quinary)"}}>{paciente?.telephone}</Row>
                                </Col>
                                <Col>
                                    <p><b>Estado da Ultima Consulta: </b></p>
                                    <Row className="p-2 m-0 rounded" style={{backgroundColor:"var(--quinary)"}}>{ultEstConsulta}</Row>
                                </Col>
                            </Stack>
                        </Col>
                    </Row>

                    <Row className="p-3 rounded mb-3" style={{backgroundColor:"var(--quaternary)"}}>
                        <h3>Realizar Consulta</h3>
                        <Form className="mb-3" onSubmit={formik.handleSubmit}>
                            <Row className="gap-3 mb-3">
                                <Col>
                                    <Form.Group controlId="heartRate">
                                        <Form.Label>Frequencia Cardiaca</Form.Label>
                                        <Form.Control isValid={!(formik.touched.heartRate && Boolean(formik.errors.heartRate))} isInvalid={formik.touched.heartRate && Boolean(formik.errors.heartRate)} min={1} step={0.01} required {...formik.getFieldProps('heartRate')} type="number"/>
                                        <Form.Control.Feedback type="valid" style={{color: CorFreqCard}}><small>{CatFreqCard}</small></Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">{formik.errors.heartRate}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="respiratoryRate">
                                        <Form.Label>Frequencia Respiratoria</Form.Label>
                                        <Form.Control isValid={!(formik.touched.respiratoryRate && Boolean(formik.errors.respiratoryRate))} isInvalid={formik.touched.respiratoryRate && Boolean(formik.errors.respiratoryRate)} min={1} step={0.01} required {...formik.getFieldProps('respiratoryRate')} type="number"/>
                                        <Form.Control.Feedback type="valid" style={{color: CorFreqResp}}><small>{CatFreqResp}</small></Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">{formik.errors.respiratoryRate}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <p>Sintomas</p>
                                <div>
                                    {sintomasOpts.map((sintoma,index)=>(
                                        <Col key={`${sintoma}${index}`}>
                                            <FormCheck type="checkbox" id={`${index}`} key={`${index}`} label={`${sintoma}`} {...formik.getFieldProps('symptoms')} value={`${sintoma}`}/>
                                        </Col>
                                    ))}
                                </div>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <Button type="submit">
                                    Realizar Consulta
                                </Button>
                            </div>
                        </Form>
                        {sucesso && (
                            <Alert variant="success">
                                Consulta Realizada com sucesso!
                            </Alert>
                        )}
                    </Row>

                    <Row className="p-3 rounded" style={{backgroundColor:"var(--quaternary)"}}>
                        <h3>Consultas Anteriores:</h3>
                        <div className="d-flex flex-column justify-content-around">
                            {consultas.length > 0 ? (
                                <Accordion>
                                    {consultas.map((consulta)=>(
                                        <ConsultItem key={consulta.id} consult={consulta}/>
                                    ))}
                                </Accordion>
                            ):(
                                <Alert variant='danger'>
                                    Nenhuma consulta Realizada
                                </Alert>
                            )}
                        </div>
                    </Row>
                </Container>
            )}

            <Modal show={erroModal} onHide={closeErroModal}>
                <Modal.Header closeButton>
                <Modal.Title>Ocorreu algum erro! ({error})</Modal.Title>
                </Modal.Header>
                <Modal.Body>Por favor verifique a sua conexão e tente novamente</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={Recarregar}>
                        Recarregar Pagina
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={loadModal} onHide={closeLoadModal}>
                <Modal.Header closeButton>
                <Modal.Title>A sua pagina já vai ser carregada</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se estiver demorando muito por favor verifique a sua conexão</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={Recarregar}>
                        Recarregar Pagina
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}