export function defEstado (Perc:number):string {
    if (Perc < 40) {
        return 'Sintomas Insuficientes'
    }else if (Perc < 60) {
        return 'Potencial Infectado'
    }else{
        return 'Possível Infectado'
    }
}