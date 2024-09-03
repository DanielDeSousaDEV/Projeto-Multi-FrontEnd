interface Cores {
    [key: string]: string;
}

const cores: Cores = {
    'Sintomas Insuficientes': 'green',
    'Potencial Infectado': 'darkorange',
    'Possível Infectado': 'red'
}

export function defCorEstado(Estado:string):string {

    let corEstado = 'black'

    if (cores[Estado]) {
        corEstado = cores[Estado]
    }

    return corEstado

    // let PossiveisEstados = {
    //     'Sintomas Insuficientes': 'green',
    //     'Potencial Infectado': 'darkorange',
    //     'Possível Infectado': 'red'
    // }
    
    // if (Estado in PossiveisEstados) {
    //     corEstado = PossiveisEstados[Estado];
    // } else {
    //     corEstado = 'black';    
    // }

}