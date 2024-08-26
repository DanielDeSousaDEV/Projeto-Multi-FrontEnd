import * as Yup from 'yup'

export const CreatePatient = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    cpf: Yup.string().required('O CPF é obrigatório'),
    birthDate: Yup.date().required('O Data de Nascimeneto é obrigatória').test('Formato invalido', 'O Formato do texto é invalido',(value)=>{
        console.log(value);
        
        return value
    }),//validação de dia apos hoje
    telephone: Yup.string().required('O Telefone é obrigatório').test('Formato invalido', 'O Formato do texto é invalido', (value,erro)=>{
        if(value === 'dan'){
            console.log('a');
            erro.createError({message:'aa'})
            
            return false

        }
    }),
    photo: Yup.string().required('A Foto é obrigatório'),
})