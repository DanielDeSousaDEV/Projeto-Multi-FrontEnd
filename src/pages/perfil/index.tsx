import { FormEvent, useEffect, useState } from "react";
import { Accordion, Alert, Badge, Button, Col, Container, Form, FormCheck, Image, Modal, Row, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { api } from "../../api/config";
import { ConsultItem, ConsultItemProp } from "./ConsultItem";
import { sintomasOpts } from "../../data/sintomasOpts"
import { defSintPerc } from "../../utils/defSintPerc";
import { defEstado } from "../../utils/defEstado";

export function Perfil () {
    let { id } = useParams();

    let [consultas, setConsultas] = useState<ConsultItemProp[]>([])

    let [paciente, setPaciente] = useState<Paciente>()

    let [ultEstConsulta, setUltEstConsulta] = useState<string>('')

    let [sucesso, setSucesso] = useState<boolean>()

    let [error, setError] = useState<string>('')

    let [erroModal, setErroModal] = useState<boolean>(false)
    
    let openErroModal = () => {setErroModal(true)}
    let closeErroModal = () => {setErroModal(false)}

    let [loadModal, setLoadModal] = useState<boolean>(true)

    let closeLoadModal = () => {setLoadModal(false)}

    useEffect(()=>{PegarTodasConsultas()}, [id, sucesso])
    useEffect(()=>{PegarDadosPaciente()}, [id])

    useEffect(() => {
        setUltEstConsulta('Indefinido')
        if (consultas.length > 0) {
            setUltEstConsulta(consultas[0].estado)
        }
    }, [consultas])

    async function PegarDadosPaciente():Promise<void> {
        try {
            await api.get(`/pacientes/${id}`).then((resp)=>{
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
            await api.get(`/pacientes/${id}/consultas`).then((resp)=>{
                setConsultas(resp.data)
            }).catch((error)=>{

                console.error(error);
                
                setError(error.message);
                
                openErroModal()
            })
        } catch (err) {
            
            console.error('ERRO:' + err);
            
        }
    }
    
    async function AdicionarNovaConsulta (e:FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setSucesso(false)
        
        let myForm = e.currentTarget
        let myformdata = new FormData(myForm)
        
        //Definição do JSON dos sintomas
        let sintomasInformados = myformdata.getAll('sintomas')
        let sintomasJSON:{sintomas:string[]} = {
            sintomas:[]
        };
        for (let index = 0; index < sintomasInformados.length; index++) {
            sintomasJSON.sintomas.push(sintomasInformados[index].toString())            
        }
        
        myformdata.set('sintomas', JSON.stringify(sintomasJSON))
        
        //definição do usuario da consulta
        myformdata.append('paciente_id',id!.toString())
        
        let consultaPerc = defSintPerc(sintomasJSON)
        
        let consultaEst = defEstado(consultaPerc)
        
        myformdata.append('estado', consultaEst)
        
        await api.post('/consultas', myformdata).then(()=>{
            setSucesso(true)

            AtualizarCondicao(consultaEst)
        }).catch((error)=>{
            setError(error.message)
            openErroModal()
        })
    }

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

    let dataDeNascNFormat = new Date (paciente?.dataNasc!)
    let dataNascFormatada = dataDeNascNFormat.toLocaleDateString('pt-br')
    
    return (
        <>
            {paciente && (
                <Container fluid className="md px-5 col-12 my-3">
                    <Row className="p-3 rounded mb-3" style={{backgroundColor:"var(--quaternary)"}}>
                    <h2>Perfil</h2>
                        <Col id="image" className="d-flex justify-content-center" lg={4}>
                            <Image src={paciente?.foto} loading="lazy" fluid draggable={false} thumbnail rounded alt="Foto Do Paciente"/>
                        </Col>
                        <Col id="dados" className="position-relative">
                            <Badge bg="secondary" className="position-absolute top-0 end-0">#ID:{id}</Badge>
                            <Stack gap={3} className="flex-column justify-content-around">
                                <Col>
                                    <p><b>Nome Completo: </b></p>
                                    <Row className="p-2 m-0 rounded" style={{backgroundColor:"var(--quinary)"}}>{paciente?.nome}</Row>
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
                                    <Row className="p-2 m-0 rounded" style={{backgroundColor:"var(--quinary)"}}>{paciente?.telefone}</Row>
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
                        <Form className="mb-3" onSubmit={AdicionarNovaConsulta}>
                            <Row className="gap-3 mb-3">
                                <Col>
                                    <Form.Group controlId="novoConsultaForm.freqCard">
                                        <Form.Label>Frequencia Cardiaca</Form.Label>
                                        <Form.Control min={1} step={0.01} required type="number" name="freqCard"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="novoConsultaForm.freqResp">
                                        <Form.Label>Frequencia Respiratoria</Form.Label>
                                        <Form.Control min={1} step={0.01} required type="number" name="freqResp"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <p>Sintomas</p>
                                <div>
                                    {sintomasOpts.map((sintoma,index)=>(
                                        <Col key={`${sintoma}${index}`}>
                                            <FormCheck type="checkbox" value={`${sintoma}`} name={'sintomas'} id={`${index}`} key={`${index}`} label={`${sintoma}`}/>
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
                                    {consultas.map((consulta,index)=>(
                                        <ConsultItem key={consulta.id} eventKey={consulta.id.toString()} id={index} estado={consulta.estado} freqCard={consulta.freqCard} freqResp={consulta.freqResp} created_at={consulta.created_at} sintomas={consulta.sintomas}/>
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