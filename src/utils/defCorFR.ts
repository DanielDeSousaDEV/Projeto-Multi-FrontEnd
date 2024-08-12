export function defCorFR (freqResp:'Bradipnéico'|'Eupnéico'|'Taquipnéico'|'Indefinido'):string {
    let corFreqResp = 'black'
    
    enum PossiveisFreqResp {
        'Bradipnéico' = 'darkorange',
        'Eupnéico' = 'green',
        'Taquipnéico' = 'red',
        'Indefinido' = 'black'
    }
    
    if (freqResp in PossiveisFreqResp) {
        corFreqResp = PossiveisFreqResp[freqResp];
    } else {
        corFreqResp = 'black';
    }

    return corFreqResp
}