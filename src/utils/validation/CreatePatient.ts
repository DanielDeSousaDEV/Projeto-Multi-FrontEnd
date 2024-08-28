import * as Yup from 'yup'
import { cpfValidator } from '@/utils/functions/cpfValidator'

export const CreatePatient = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    cpf: Yup.string().required('O CPF é obrigatório').test('InvalidFormat', 'O Formato do CPF é invalido', (value)=>{
        const cpfRegExp = /[\d]{3}[.][\d]{3}[.][\d]{3}[-][\d]{2}/

        return cpfRegExp.test(value)
    }).test('CPFValid', 'O CPF possui um valor invalido', (value)=>{
        return cpfValidator(value)
    }),
    birthDate: Yup.date().required('O Data de Nascimeneto é obrigatória'), //validação de dia apos hoje
    telephone: Yup.string().required('O Telefone é obrigatório').test('InvalidFormat', 'O formato do Telefone é invalido', (value)=>{
        const telephoneRegExp = /[\(][\d]{2}[\)][\d]{5}[-][\d]{4}/

        return telephoneRegExp.test(value)
    }),
    photo: Yup.mixed<File>().required('A Foto é obrigatório').test('FileType', 'O Arquivo não possui não possui um tipo valido', (value)=>{
        const permittedExtensions = [
            '.png',
            '.jpg',
            '.jpeg'
        ]

        const FileName = value.name

        const isValid = permittedExtensions.some((extension)=> FileName.endsWith(extension))
        console.log(isValid)

        return isValid
    }).test('FileSize', 'A Imagem é muito grande', (value)=>{
        const maxSize = 3 * 1024 * 1024 

        console.log(value.size);
        
        return value.size <= maxSize
    })
})