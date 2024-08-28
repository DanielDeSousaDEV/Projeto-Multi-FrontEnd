import { sintomasOpts } from "../data/sintomasOpts";

export function defSintPerc (Sintomas:string[]):number {
    
    let qtdSintomas = Sintomas.length;

    let consultaPerc = 0

    if (!(Sintomas[0] === 'Nenhum Sintoma Informado')) {

        consultaPerc = Math.round((qtdSintomas / sintomasOpts.length) * 100);

    }

    return consultaPerc
}