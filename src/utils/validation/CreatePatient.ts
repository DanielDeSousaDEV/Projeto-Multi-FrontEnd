import * as Yup from 'yup'

export const CreatePatient = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    cpf: Yup.string().required('O CPF é obrigatório'),
    birthDate: Yup.date().required('O Data de Nascimeneto é obrigatória'),//validação de dia apos hoje
    telephone: Yup.string().required('O Telefone é obrigatório').test('Formato invalido', 'O Formato do texto é invalido', (value)=>{
        // if(value === 'dan'){
        //     console.log('a');
        //     erro.createError({message:'aa'})
            
        //     return false

        // }
 

        console.log(value.length)

        return value.length > 5
    }),
    photo: Yup.string().required('A Foto é obrigatório'),
})