import { FaArrowCircleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import { defCorEstado } from "@utils/defCorEstado";

export interface patientRowProps {
    id:number,
    name:string,
    condition:'Sintomas Insuficientes'|'Potencial Infectado'|'Possível Infectado'
    cpf:string,
    birthDate:number
}

export function PatientRow(patient:Patient) {

    let dataNascimento = new Date(patient.birthDate)
    
    let dataAtual = new Date();

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

    
    
    // let corEstado = defCorEstado(patient.condicao)

    //concertar as cores dos estados dps
    
    return(
        <tr>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td >{patient.condition}</td> {/*style={{color:corEstado}}*/}
            <td>{patient.cpf}</td>
            <td>{idade}</td>
            <td>
                <Link className="d-flex justify-content-center align-items-center h-full fluid" to={'/perfil/' + patient.id} state={patient}>
                    <FaArrowCircleRight size={25}/>
                </Link>
            </td>
        </tr>
    )
}   