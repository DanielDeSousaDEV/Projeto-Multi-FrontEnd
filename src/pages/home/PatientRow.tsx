import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { defCorEstado } from "../../utils/defCorEstado";

export interface patientRowProps {
    id:number,
    nome:string,
    condicao:'Sintomas Insuficientes'|'Potencial Infectado'|'Possível Infectado'
    cpf:string,
    dataNasc:number
}

export function PatientRow(paciente:patientRowProps) {

    let dataNascimento = new Date(paciente.dataNasc)
    
    let dataAtual = new Date();

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    
    let corEstado = defCorEstado(paciente.condicao)
    
    return(
        <tr>
            <td>{paciente.id}</td>
            <td>{paciente.nome}</td>
            <td style={{color:corEstado}}>{paciente.condicao}</td>
            <td>{paciente.cpf}</td>
            <td>{idade}</td>
            <td>
                <Link className="d-flex justify-content-center align-items-center h-full fluid" to={'/perfil/' + paciente.id}>
                    <FaArrowCircleRight size={25}/>
                </Link>
            </td>
        </tr>
    )
}   