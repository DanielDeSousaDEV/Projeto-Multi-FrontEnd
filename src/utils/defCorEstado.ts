export function defCorEstado(Estado:'Sintomas Insuficientes'|'Potencial Infectado'|'Possível Infectado'):string {
    let corEstado = 'black'

    enum PossiveisEstados {
        'Sintomas Insuficientes' = 'green',
        'Potencial Infectado' = 'darkorange',
        'Possível Infectado' = 'red'
    }
    
    if (Estado in PossiveisEstados) {
        corEstado = PossiveisEstados[Estado];
    } else {
        corEstado = 'black';
    }

    return corEstado
}