import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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

    let corEstado = defCorEstado(patient.condition)
    
    return(
        <tr>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td style={{color:corEstado}}>{patient.condition}</td> {/**/}
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