import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { api } from "@/api/config";
import { patientRowProps, PatientRow } from "./PatientRow";
import { PatientsDashboard } from "./PatientsDashboard";

import { PatientCreationModal } from "@components/modals/PatientCreationModal/index.js";

export function Home() {

    let [sucesso, setSucesso] = useState<boolean>()

    let [pacientes, setPacientes] = useState<Patient[]>([])

    useEffect(()=>{PegarTodosPacientes()},[sucesso])

    let [error, setError] = useState<any>(false);

    let [errorModal, setErrorModal] = useState<boolean>(false)
    
    let openErrorModal = () => {setErrorModal(true)}
    let closeErrorModal = () => {setErrorModal(false)}

    let [errorAlert, setErrorAlert] = useState<boolean>(false)
    
    let openErrorAlert = () => {setErrorAlert(true)}
    let closeErrorAlert = () => {
        setErrorAlert(false)
        setError(false)
    }

    let [loadModal, setLoadModal] = useState<boolean>(true)

    let closeLoadModal = () => {setLoadModal(false)}

    //Modal
    const [pacienteModal, setPacienteModal] = useState(false);

    const closePacienteModal = () => {setPacienteModal(false)}
    const openPacienteModal = () => {setPacienteModal(true)}


    
    
    async function PegarTodosPacientes():Promise<void> {
        api.get('/patients').then((resp)=>{
            setPacientes(resp.data)
            closeLoadModal()
        }).catch((error)=>{
            console.error(error);
            closeLoadModal()
            setError(error.message)
            openErrorModal()
        })
    }

    // async function AdicionarNovoPaciente (e:React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault()

    //     setSucesso(false)
        
    //     closeErrorAlert()
        
    //     let myForm = e.currentTarget
        
    //     let myformdata = new FormData(myForm)
        
    //     myformdata.append('condicao','Indefinido')
        
    //     await api.post('/pacientes',myformdata).then(()=>{
    //         setSucesso(true)
    //     }).catch((erros)=>{
    //         setError(false)
    //         if(erros.response?.status === 422){
    //             console.error(erros)
    //             setError(erros.response.data.errors)
    //             openErrorAlert()
    //             return
    //         }
    //         setError(erros.message)
    //         openErrorModal()
    //     })
    //     closePacienteModal()
    // }

    function Recarregar() {
        location.reload()
    }

    function debug() {
        console.log('debug')
        console.log(pacientes[0])
    }
    

    return(
        <>
            <Container fluid className="md px-5 col-12 my-3">
                <Row className="p-2">

                    <Col direction="horizontal" className="text-center mb-3" md={5}>
                    
                        <Row className="mb-3">
                            <Button className="py-2" onClick={openPacienteModal}>Adicionar novo paciente</Button>
                        </Row>

                        <PatientsDashboard data={pacientes}/>

                        {errorAlert && (
                            <Alert variant="warning" onClose={closeErrorAlert} dismissible>
                                <ul className="text-start">
                                    {Object.keys(error).map((campo, index) => (
                                        <li key={index}>{campo}
                                            <ul>
                                                {error[campo].map((messagem:string, index:number)=>(
                                                    <li key={index}>{messagem}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </Alert>
                        )}

                        {sucesso && (
                            <Alert variant="success">
                                Paciente cadastrado com sucesso
                            </Alert>
                        )} 

                    </Col>

                    <Col md={7}>
                        {pacientes.length > 0 ? (
                            <Table striped bordered hover size='xxxl'>
                                <thead onClick={debug}>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Condição</th>
                                        <th>CPF</th>
                                        <th>Idade</th>
                                        <th>Realizar Consulta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pacientes.map((paciente)=>(
                                        // não aparece porque tá em ingles
                                        <PatientRow 
                                            key={paciente.id} 
                                            id={paciente.id} 
                                            name={paciente.name} 
                                            condition={paciente.condition} 
                                            cpf={paciente.cpf} 
                                            birthDate={paciente.birthDate} 
                                            photo={paciente.photo}
                                            telephone={paciente.telephone}
                                            created_at={paciente.created_at} 
                                            updated_at={paciente.updated_at}
                                        />
                                    ))}
                                </tbody>
                            </Table>    
                        ):(
                            <Alert variant='danger'>
                                Nenhuma Paciente cadastrado
                            </Alert>
                        )}
                    </Col>
                    
                </Row>
            </Container>
            
            <Modal show={errorModal} onHide={closeErrorModal}>
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
            
            <PatientCreationModal animation centered size="xl" show={pacienteModal} handleClose={closePacienteModal} />

        </>
    )
}