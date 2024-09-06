import * as Yup from 'yup'

export const consultRegistration = Yup.object().shape({
    heartRate: Yup.number().required('A Frequência Cardiaca é obrigatoria'),
    respiratoryRate: Yup.number().required('A frequência Respiratoria é obrigatoria'),
    symptoms: Yup.array()
})