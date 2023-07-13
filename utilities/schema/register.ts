import * as yup from 'yup'

const schemaFormRegister = yup.object({
    fullName: yup.string().required('Bạn cần nhập trường này'),
    email: yup
        .string()
        .email('Trường này phải là email')
        .required('Bạn cần nhập email'),
    password: yup
        .string()
        .min(6, 'Cần nhập tối thiểu 6 ký tự')
        .required('Bạn cần nhập password'),
    confirmPassword: yup
        .string()
        .min(6, 'Cần nhập tối thiểu 6 ký tự')
        .required('Bạn cần nhập password')
        .oneOf([yup.ref('password')], 'Password không khớp'),
})

export default schemaFormRegister