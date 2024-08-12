export function defFreqResp (freqResp:number):'Bradipnéico'|'Eupnéico'|'Taquipnéico'|'Indefinido' {
    if (freqResp < 14) {
        return 'Bradipnéico'
    }else if (freqResp <= 20) {
        return 'Eupnéico'
    }else if (freqResp > 20) {
        return 'Taquipnéico'
    }else {
        return 'Indefinido'
    }
} 