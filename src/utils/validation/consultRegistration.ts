import * as Yup from 'yup'

export const consultRegistration = Yup.object().shape({
    heartRate: Yup.number().required('A Frequência Cardiaca é obrigatoria'),
    respiratoryRate: Yup.number().required('A frequência Respiratoria é obrigatoria'),
    symptoms: Yup.array(),
    t: Yup.array().test('a ', 'a', (value)=>{
        //por alguma razão o valor não chega aqui mas o resto tá dando certo
        console.log(value)
        return true
    })
})