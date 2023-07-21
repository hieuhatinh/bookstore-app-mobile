import * as yup from 'yup'

const schemaChangeProfile = yup.object({
    fullName: yup
        .string(),
    password: yup
        .string()
        .min(6, 'Cần nhập tối thiểu 6 ký tự')
})

export default schemaChangeProfile