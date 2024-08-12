export function defCorFC (freqCard:'Bradicárdico'|'Normocárdico'|'Taquicárdico'|'Indefinido'):string {
    let corFreqCard = 'black'
    
    enum PossiveisFreqCard {
        'Bradicárdico' = 'darkorange',
        'Normocárdico' = 'green',
        'Taquicárdico' = 'red',
        'Indefinido' = 'black'
    }
    
    if (freqCard in PossiveisFreqCard) {
        corFreqCard = PossiveisFreqCard[freqCard];
    } else {
        corFreqCard = 'black';
    }

    return corFreqCard
}