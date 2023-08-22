import * as yup from 'yup'

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const schemaFormRegister = yup.object({
    phoneNumber: yup
        .string()
        .min(10, 'Độ dài chưa phù hợp, phải 10 kí tự')
        .max(10, 'Độ dài chưa phù hợp, phải 10 kí tự')
        .matches(phoneRegExp, 'Trường này phải đúng định dạng số điện thoại')
        .required('Bạn cần nhập trường này'),
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
