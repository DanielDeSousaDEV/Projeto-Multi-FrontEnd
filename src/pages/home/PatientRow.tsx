import { FaArrowCircleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import { defCorEstado } from "@utils/defCorEstado";

export interface patientRowProps {
    id:number,
    nome:string,
    condicao:'Sintomas Insuficientes'|'Potencial Infectado'|'Possível Infectado'
    cpf:string,
    dataNasc:number
}

export function PatientRow(paciente:Patient) {

    let dataNascimento = new Date(paciente.birthDate)
    
    let dataAtual = new Date();

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

    
    
    
    // let corEstado = defCorEstado(paciente.condicao)

    //concertar as cores dos estados dps
    
    return(
        <tr>
            <td>{paciente.id}</td>
            <td>{paciente.name}</td>
            <td >{paciente.condition}</td> {/*style={{color:corEstado}}*/}
            <td>{paciente.cpf}</td>
            <td>{idade}</td>
            <td>
                <Link className="d-flex justify-content-center align-items-center h-full fluid" to={'/perfil/' + paciente.id} state={paciente}>
                    <FaArrowCircleRight size={25}/>
                </Link>
            </td>
        </tr>
    )
}   