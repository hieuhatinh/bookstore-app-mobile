import * as yup from 'yup'

const schemaFormLogin = yup.object({
    email: yup
        .string()
        .email('Trường này phải là email')
        .required('Bạn cần nhập email'),
    password: yup
        .string()
        .min(6, 'Cần nhập tối thiểu 6 ký tự')
        .required('Bạn cần nhập password'),
})

export default schemaFormLogin