export function defFreqCard (freqCard:number):'Bradicárdico'|'Normocárdico'|'Taquicárdico'|'Indefinido' {
    if (freqCard < 60) {
        return 'Bradicárdico'
    }else if (freqCard <= 100) {
        return 'Normocárdico'
    }else if (freqCard > 100) {
        return 'Taquicárdico'
    }else {
        return 'Indefinido'
    }
}