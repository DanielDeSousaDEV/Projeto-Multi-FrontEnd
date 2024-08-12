import { Col, Container, Row } from "react-bootstrap";
import { patientRowProps } from "./PatientRow";

interface PatientsDashboardProps {
    Dados:patientRowProps[]
}

export function PatientsDashboard({Dados}:PatientsDashboardProps) {
        var EstadosPerc:Array<number> = []

        let PossiveisEstados = [
            'Sintomas Insuficientes',
            'Potencial Infectado',
            'Possível Infectado',
            'Indefinido'
        ]
        
        
        PossiveisEstados.map((Estado)=>{            
            EstadosPerc.push(
                Dados.filter((Paciente)=>{
                    return Paciente.condicao === Estado
                }).length/Dados.length
            )
        })

        EstadosPerc.map((EstadoPerc,index)=>{
            EstadosPerc[index] = Math.round(EstadoPerc * 100)
        }) 
    return(
        <Row className="rounded justify-content-center py-2 mb-3" style={{backgroundColor:"var(--tertiary)"}}>
            
            <Container>
                <h3 className="fw-bold">Dashboard</h3>
            </Container>

            <hr />

            <Row className="text-start justify-content-center w-100 p-0 gap-1">
                <Row className="gap-1">
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Sintomas Insuficientes:</b><br />
                        <span>{EstadosPerc[0]}%</span>
                    </Col>
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Potencial Infectado:</b><br />
                        <span>{EstadosPerc[1]}%</span>
                    </Col>
                </Row>
                <Row className="gap-1">
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Possível Infectado:</b><br />
                        <span>{EstadosPerc[2]}%</span>
                    </Col>
                    <Col className="rounded py-1" style={{backgroundColor:"var(--quaternary)"}}>
                        <b>Indeterminados:</b><br />
                        <span>{EstadosPerc[3]}%</span>
                    </Col>
                </Row>
            </Row>

        </Row>
    )
}