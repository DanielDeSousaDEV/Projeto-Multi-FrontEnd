import { sintomasOpts } from "../data/sintomasOpts";

export function defSintPerc (Sintomas:Sintomas):number {
    
    let qtdSintomas = Sintomas.sintomas.length;

    let consultaPerc = 0

    if (!(Sintomas.sintomas[0] === 'Nenhum Sintoma Informado')) {

        consultaPerc = Math.round((qtdSintomas / sintomasOpts.length) * 100);

    }

    return consultaPerc
}