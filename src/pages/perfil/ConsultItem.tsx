import { Accordion, Col, Row, Stack } from "react-bootstrap";

import { defFreqResp } from "../../utils/defFreqResp";
import { defFreqCard } from "../../utils/defFreqCard";
import { defSintPerc } from "../../utils/defSintPerc";

import { defCorFR } from "../../utils/defCorFR";
import { defCorFC } from "../../utils/defCorFC";
import { defCorEstado } from "../../utils/defCorEstado";

export interface ConsultItemProp {
    consult: Consult
}

export function ConsultItem ({consult}:ConsultItemProp) {

    let symptomsArray:string[]

    symptomsArray = ['Nenhum Sintoma Informado']

    if (consult.symptoms) {
        symptomsArray = consult.symptoms.split(',')
    }

    // let symptomsArrayString = consult.symptoms.slice(2, consult.symptoms.length - 2)

    //Definição da porcentagem de possbilidade de infecção
    let consultaPerc = defSintPerc(symptomsArray);

    //denifição da data da consulta
    let dataConsulta = new Date(consult.created_at).toLocaleDateString('pt-br')

    //Definição da cor do texto do estado
    let corEstado = defCorEstado(consult.condition);

    //definição do estado da frequencia cardiaca
    let estadoFC = defFreqCard(consult.heartRate)

    //definição da cor do texto da frequencia cardiaca
    let corFreqCard = defCorFC(estadoFC)

    //definição do estado da frequencia repiratoria
    let estadoFR = defFreqResp(consult.respiratoryRate)

    //definição da cor do texto da frequencia repiratoria
    let corFreqResp = defCorFR(estadoFR)
    
    return(
        <Accordion.Item eventKey={consult.id.toString()}>
            <Accordion.Header>
                <div className="container-fluid d-flex justify-content-between">
                    <strong>Diagnostico: <span style={{color:corEstado}}>{consult.condition}</span></strong> 
                    <strong>Data da Consulta: {dataConsulta}</strong>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <Stack gap={3}>
                    <h5>Relatorio do diagnostico</h5>
                    <strong>O paciente apresentou os seguintes sintomas: </strong>
                    <div className="d-flex flex-wrap gap-3">
                        {symptomsArray?.map((symptom,index)=>(
                            <div key={index} className="p-2 rounded" style={{backgroundColor:"var(--tertiary)"}}>{symptom}</div>
                        ))}
                    </div>
                    <strong>E apresentou:</strong>
                    <Col>
                        <strong>Frequencia Cardiaca:</strong><br/>{consult.heartRate} bpm <span style={{color:corFreqCard}}>({estadoFC})</span>
                    </Col>
                    <Col>
                        <strong>Frequencia Respiratoria:</strong><br/>{consult.respiratoryRate} irpm <span style={{color:corFreqResp}}>({estadoFR})</span>
                    </Col>
                    <hr />
                    <strong>Diagnostico Final:</strong>
                    <Row>
                        <Col>
                            <p style={{color:corEstado}}>{consult.condition}</p>
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