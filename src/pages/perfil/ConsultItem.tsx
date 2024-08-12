import { Accordion, Col, Row, Stack } from "react-bootstrap";

import { defFreqResp } from "../../utils/defFreqResp";
import { defFreqCard } from "../../utils/defFreqCard";
import { defSintPerc } from "../../utils/defSintPerc";

import { defCorFR } from "../../utils/defCorFR";
import { defCorFC } from "../../utils/defCorFC";
import { defCorEstado } from "../../utils/defCorEstado";

export interface ConsultItemProp {
    id:number,
    estado:'Sintomas Insuficientes'|'Potencial Infectado'|'Possível Infectado',
    freqCard:number,
    freqResp:number,
    sintomas:string,
    created_at:string,
    eventKey:string
}

export function ConsultItem (consulta:ConsultItemProp) {

    //determinação do objeto sintomas
    let sintomasJSON:Sintomas = JSON.parse(consulta.sintomas)

    if (sintomasJSON.sintomas.length === 0) {
        sintomasJSON = {
            sintomas:[
                "Nenhum Sintoma Informado"
            ]
        }
    }

    //Definição da porcentagem de possbilidade de infecção
    let consultaPerc = defSintPerc(sintomasJSON);

    //denifição da data da consulta
    let dataConsulta = new Date(consulta.created_at).toLocaleDateString('pt-br')

    //Definição da cor do texto do estado
    let corEstado = defCorEstado(consulta.estado);

    //definição do estado da frequencia cardiaca
    let estadoFC = defFreqCard(consulta.freqCard)

    //definição da cor do texto da frequencia cardiaca
    let corFreqCard = defCorFC(estadoFC)

    //definição do estado da frequencia repiratoria
    let estadoFR = defFreqResp(consulta.freqResp)

    //definição da cor do texto da frequencia repiratoria
    let corFreqResp = defCorFR(estadoFR)
    
    return(
        <Accordion.Item eventKey={consulta.eventKey}>
            <Accordion.Header>
                <div className="container-fluid d-flex justify-content-between">
                    <strong>Diagnostico: <span style={{color:corEstado}}>{consulta.estado}</span></strong>
                    <strong>Data da Consulta: {dataConsulta}</strong>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <Stack gap={3}>
                    <h5>Relatorio do diagnostico</h5>
                    <strong>O paciente apresentou os seguintes sintomas: </strong>
                    <div className="d-flex flex-wrap gap-3">
                        {sintomasJSON.sintomas.map((sintoma,index)=>(
                            <div key={index} className="p-2 rounded" style={{backgroundColor:"var(--tertiary)"}}>{sintoma}</div>
                        ))}
                    </div>
                    <strong>E apresentou:</strong>
                    <Col>
                        <strong>Frequencia Cardiaca:</strong><br/>{consulta.freqCard} bpm <span style={{color:corFreqCard}}>({estadoFC})</span>
                    </Col>
                    <Col>
                        <strong>Frequencia Respiratoria:</strong><br/>{consulta.freqResp} irpm <span style={{color:corFreqResp}}>({estadoFR})</span>
                    </Col>
                    <hr />
                    <strong>Diagnostico Final:</strong>
                    <Row>
                        <Col>
                            <p style={{color:corEstado}}>{consulta.estado}</p>  
                        </Col>
                        <Col>
                        <p>{consultaPerc}% dos sintomas</p>                                       
                        </Col>
                    </Row>
                </Stack>
            </Accordion.Body>
        </Accordion.Item>
    )
}